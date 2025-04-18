import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import PromptInput from "./components/PromptInput";
import ReminderList from "./components/ReminderList";



function App() {
  const [prompt, setPrompt] = useState("");
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load saved reminders on first render
  useEffect(() => {
    const stored = localStorage.getItem("reminders");
    console.log("stored", stored);
    if (stored) {
      setReminders(JSON.parse(stored));
    }
  }, []);

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    console.log(reminders)
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/parse", { prompt });
      setReminders((prev) => [...prev, res.data]);
      setPrompt("");
    } catch (err) {
      alert("Error parsing reminder");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (index) => {
    setReminders((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index, updatedReminder) => {
    setReminders((prev) =>
      prev.map((reminder, i) => (i === index ? updatedReminder : reminder))
    );
  };


  return (
    <div className="App">
      <h1>🧠 AI Reminder Assistant</h1>
      <PromptInput
        prompt={prompt}
        setPrompt={setPrompt}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <ReminderList
        reminders={reminders}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;
