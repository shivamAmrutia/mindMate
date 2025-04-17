const {CohereClientV2 } = require('cohere-ai');

const cohere = new CohereClientV2({
  token: process.env.CO_API_KEY
})

async function parseReminder(prompt) {
  const system_message = 'Extract the reminder details from user input and Respond in this JSON format:{ "task": "", "time": "", "recurring": [], "date": "", "note": "" } and just respond with plain JSON text, such that it can be parsed';
  const response = await cohere.chat({
    model: 'command-r',
    messages:   [
      {"role": "system", "content": system_message},
      {"role": "user", "content": prompt}
    ],
    type: "json_object",
    temperature: 0.3,
  });

  const message = response.message.content
  try {
    return message;
  } catch (e) {
    throw new Error(`Could not parse response into JSON:\n${message}`);
  }
}

module.exports = { parseReminder };
