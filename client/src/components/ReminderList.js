// src/components/ReminderList.jsx
import React from "react";
import ReminderCard from "./ReminderCard";

const ReminderList = ({ reminders, onDelete, onEdit }) => (
  <div className="reminder-list">
    {reminders.map((reminder, index) => (
      <ReminderCard
        key={index}
        index={index}
        reminder={reminder}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    ))}
  </div>
);

export default ReminderList;
