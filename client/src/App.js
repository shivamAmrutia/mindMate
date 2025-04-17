import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reminder, setReminder] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/parse", { prompt });
      console.log(res.data[0].text)
      setReminder(res.data[0].text);
    } catch (err) {
      alert("Error parsing reminder");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>🧠 AI Reminder Assistant</h1>
      <textarea
        rows={4}
        placeholder="e.g., Remind me to email Sarah every Monday at 10 AM"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Parsing..." : "Create Reminder"}
      </button>

      {reminder && (
        <div className="card">
          <h3>🔔 Your Reminder</h3>
          <p><strong>Task:</strong> {reminder.task}</p>
          <p><strong>Time:</strong> {reminder.time}</p>
          <p><strong>Date:</strong> {reminder.date}</p>
          <p><strong>Recurring:</strong> {reminder.recurring?.join(", ")}</p>
          <p><strong>Note:</strong> {reminder.note}</p>
        </div>
      )}
    </div>
  );
}

export default App;
