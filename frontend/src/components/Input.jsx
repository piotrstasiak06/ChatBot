import { ChatContext } from "../store/ChatContext";
import { useState } from "react";
import { useContext } from "react";
import VoiceRecorder from "./voiceRecorder";

export default function Input() {
  const { addMessage, addDummyResponse } = useContext(ChatContext);
  const [error, setError] = useState("");
  const [enteredMessage, setEnteredMessage] = useState({
    message: "",
  });

  const handleInputChange = (name, value) => {
    setEnteredMessage({ ...enteredMessage, [name]: value });
  };

  const handleSubmitMessage = (event) => {
    event.preventDefault();
    if (enteredMessage.message.trim() === "") {
      setError("Message cannot be empty");
      return;
    }
    const timestamp = Date.now();
    addMessage({
      id: timestamp,
      message: enteredMessage.message,
      sender: "user",
    });
    setEnteredMessage({ message: "" });
    setError("");

    addDummyResponse(timestamp)
  }

  return (
    <>
      <div className="input">
        <form onSubmit={handleSubmitMessage}>
          <input
            type="text"
            name="message"
            placeholder="Type a message..."
            onChange={(event) =>
              handleInputChange("message", event.target.value)
            }
            value={enteredMessage.message}
             onKeyDown={(event) => {
              if(event.key === 'Enter') {
                event.preventDefault();
                handleSubmitMessage(event);
              }
            }}
          />
          <div className="button-row">
            <VoiceRecorder />
            <button type="submit">{"\u279C"}</button>
          </div>
        </form>
      </div>
    </>
  );
}
