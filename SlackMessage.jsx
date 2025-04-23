// App.js
import React, { useState } from "react";

function App() {
  const webhookUrl =
    "https://hooks.slack.com/services/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"; // Replace with your actual Slack webhook URL

  const [delayInput, setDelayInput] = useState("");
  const [delayInputUnit, setDelayInputUnit] = useState("seconds");
  const [slackMessage, setSlackMessage] = useState("");
  const [slackHookUrl, setSlackHookUrl] = useState(webhookUrl);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // determine how much time will be the delay
    let multiplier = 1;
    switch (delayInputUnit) {
      case "minutes":
        multiplier = 60;
      case "hours":
        multiplier = 3600;
      default:
        multiplier = 1;
    }

    // convert seconds, minutes and hours to milliseconds
    const delayTime = delayInput * multiplier * 1000;

    setStatus("⏳ Waiting...");
    setButtonDisabled(true);

    new Promise((resolve, reject) =>
      setTimeout(async () => {
        try {
          const response = await fetch(slackHookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: "From Enrico Esperila's Slack Bot: " + slackMessage,
            }),
          });

          if (response.ok) {
            setStatus("✅ Message sent!");
            setMessage("");
          } else {
            setStatus("❌ Failed to send message.");
          }
          setButtonDisabled(false);
        } catch (error) {
          console.log(error);
          setStatus("⚠️ Error: " + error.message);
        }
      }, delayTime)
    );
  };

  const buttonText =
    "Send" + (delayInput > 0 ? " in " + delayInput + " " + delayInputUnit : "");

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h4>Send a Message to Slack</h4>
      <form onSubmit={handleSubmit}>
        <p>
          <span>Delay input </span>
          <input
            type="number"
            min={0}
            value={delayInput}
            onChange={(e) => setDelayInput(e.target.value)}
            required
            style={{
              padding: "0.5rem",
              width: "100px",
              marginRight: "1rem",
              fontSize: "1rem",
            }}
          />
          <select
            onChange={(e) => setDelayInputUnit(e.target.value)}
            style={{
              padding: "0.5rem",
              width: "100px",
              marginRight: "1rem",
              fontSize: "1rem",
            }}
          >
            <option>seconds</option>
            <option>minutes</option>
            <option>hours</option>
          </select>
        </p>
        <p>
          <span>Slack Message input: </span>
          <input
            type="text"
            value={slackMessage}
            onChange={(e) => setSlackMessage(e.target.value)}
            placeholder="Type your message here"
            required
            style={{
              padding: "0.5rem",
              width: "300px",
              marginRight: "1rem",
              fontSize: "1rem",
            }}
          />
        </p>
        <p>
          <span>Slack Hook URL: </span>
          <input
            type="text"
            value={slackHookUrl}
            onChange={(e) => setSlackHookUrl(e.target.value)}
            placeholder="Type your slack hook URL here"
            required
            style={{
              padding: "0.5rem",
              width: "500px",
              marginRight: "1rem",
              fontSize: "1rem",
            }}
          />
        </p>
        <p>
          <button
            type="submit"
            disabled={
              !(delayInput > 0 && slackMessage != "" && slackHookUrl != "") ||
              buttonDisabled
            }
            style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}
          >
            {buttonText}
          </button>
        </p>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default App;
