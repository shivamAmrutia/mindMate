// src/components/ReminderCard.jsx
import React, { useState } from "react";

const ReminderCard = ({ reminder, index, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedReminder, setEditedReminder] = useState({ ...reminder });

  const handleSave = () => {
    onEdit(index, editedReminder);
    setIsEditing(false);
  };

  return (
    <div className="card">
      {isEditing ? (
        <>
          <h3>🔔 Reminder #{index + 1}</h3>
          <p><strong>Task:</strong> 
          <input
            value={editedReminder.task}
            onChange={(e) => setEditedReminder({ ...editedReminder, task: e.target.value })}
          /></p>
          <p><strong>Time:</strong>
          <input
            value={editedReminder.time}
            onChange={(e) => setEditedReminder({ ...editedReminder, time: e.target.value })}
          /></p>
          <p><strong>Date:</strong> 
          <input
            value={editedReminder.date}
            onChange={(e) => setEditedReminder({ ...editedReminder, date: e.target.value })}
          /></p>
          <p><strong>Recurring:</strong>
          <input
            value={editedReminder.recurring.join(", ")}
            onChange={(e) =>
              setEditedReminder({
                ...editedReminder,
                recurring: e.target.value.split(",").map((r) => r.trim()),
              })
            }
          /></p>
          <p><strong>Note:</strong>
          <input
            value={editedReminder.note}
            onChange={(e) => setEditedReminder({ ...editedReminder, note: e.target.value })}
          /></p>

          <button onClick={handleSave}>💾 Save</button>
          <button onClick={() => setIsEditing(false)}>❌ Cancel</button>
        </>
      ) : (
        <>
          <h3>🔔 Reminder #{index + 1}</h3>
          <p><strong>Task:</strong> {reminder.task}</p>
          <p><strong>Time:</strong> {reminder.time}</p>
          <p><strong>Date:</strong> {reminder.date}</p>
          <p><strong>Recurring:</strong> {reminder.recurring?.join(", ") || "None"}</p>
          <p><strong>Note:</strong> {reminder.note || "None"}</p>

          <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
          <button onClick={() => onDelete(index)}>🗑️ Delete</button>
        </>
      )}
    </div>
  );
};

export default ReminderCard;
