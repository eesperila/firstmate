// App.js
import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const webhookUrl =
    "https://hooks.slack.com/services/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"; // Replace with your actual Slack webhook URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message }),
      });

      if (response.ok) {
        setStatus("✅ Message sent!");
        setMessage("");
      } else {
        setStatus("❌ Failed to send message.");
      }
    } catch (error) {
      console.log(error);
      setStatus("⚠️ Error: " + error.message);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2>Send a Message to Slack</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
          required
          style={{
            padding: "0.5rem",
            width: "300px",
            marginRight: "1rem",
            fontSize: "1rem",
          }}
        />
        <button
          type="submit"
          style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}
        >
          Send
        </button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default App;
