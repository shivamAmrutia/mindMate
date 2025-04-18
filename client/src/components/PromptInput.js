import React from "react";

const PromptInput = ({ prompt, setPrompt, handleSubmit, loading }) => (
  <div className="input-container">
    <textarea
      rows={4}
      placeholder="e.g., Remind me to email Sarah every Monday at 10 AM"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
    />
    <button onClick={handleSubmit} disabled={loading || !prompt.trim()}>
      {loading ? "Parsing..." : "Create Reminder"}
    </button>
  </div>
);

export default PromptInput;
