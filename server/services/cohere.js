const {CohereClientV2 } = require('cohere-ai');

const cohere = new CohereClientV2({
  token: process.env.CO_API_KEY
})

function cleanJSON(text) {
  // Remove backticks, markdown, and trim
  const cleaned = text.text
    .replace(/```(json)?/g, '')
    .trim();

  try {
    const parsed = JSON.parse(cleaned);
    return normalizeReminder(parsed);
  } catch (e) {
    throw new Error(`Failed to parse Cohere response:\n${cleaned}`);
  }
}

function normalizeReminder(reminder) {
  const safeReminder = {
    task: reminder.task || '',
    time: reminder.time || '',
    date: reminder.date || '',
    recurring: Array.isArray(reminder.recurring) ? reminder.recurring : [],
    note: reminder.note || '',
  };

  // Example normalization: lowercase days, strip extra whitespace
  safeReminder.recurring = safeReminder.recurring.map(day => day.trim().toLowerCase());

  // You could add time/date formatting here too if needed
  return safeReminder;
}

async function parseReminder(prompt) {

  //extracting today's date to provide to cohere as context
  const today = new Date().toISOString().split('T')[0]; // "2025-04-18"

  const readableDate = new Date().toLocaleDateString('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  }); // "Friday, April 18, 2025"


  const system_message = `You are an assistant that extracts structured reminder data from natural language.

  Todays date is ${readableDate}

  Your task is to extract and return a JSON object with the following fields:
  - "task": the core activity the user wants to be reminded about.
  - "time": the time of day for the reminder, such as "9:00 AM" or "22:30".
  - "date": the exact date of the reminder in "YYYY-MM-DD" format. If the input contains vague terms like "tomorrow", "in two days", or "next week", do NOT return those directly. Instead, set the value based on actual date.
  - "recurring": a list of recurring patterns (e.g., ["Monday", "Wednesday"]). If it's not recurring, return an empty array '[]'.
  - "note": any additional detail or instruction. If there's no extra note, return 'null'.
  
  If a field is not explicitly mentioned or is ambiguous, fill it with 'null' or '[]'.
  
  Return the result as **a minified, valid JSON object only**. Do not include explanations, markdown, or code blocks.
  
  Example:
  { "task": "Call doctor", "time": "3:00 PM", "date": null, "recurring": [], "note": null }`;
  
  const response = await cohere.chat({
    model: 'command-r',
    messages:   [
      {"role": "system", "content": system_message},
      {"role": "user", "content": prompt}
    ],
    type: "json_object",
    temperature: 0.3,
  });

  const message = response.message.content[0];
  try {
    return cleanJSON(message);
  } catch (e) {
    throw new Error(`Could not parse response into JSON:\n${message}`);
  }
}

module.exports = { parseReminder };
