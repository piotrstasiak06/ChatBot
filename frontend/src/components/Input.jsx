import { ChatContext } from "../store/ChatContext";
import { useState } from "react";
import { useContext } from "react";
import VoiceRecorder from "./voiceRecorder";

export default function Input() {
  const { addMessage, updateLastMessage } = useContext(ChatContext);
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
    addMessage({
      id: Date.now(),
      message: enteredMessage.message,
      sender: "user",
    });
    setEnteredMessage({ message: "" });
    setError("");

    setTimeout(() => {
      //
      addMessage({ id: Date.now() + 1, message: "...", sender: "ChatBot" });
    }, 500);

    // simulation of backend processing
    setTimeout(() => {
      // Replace typing indicator with actual response
      updateLastMessage({
        id: Date.now(),
        message: "This is the response from ChatBot.",
        sender: "ChatBot",
      });
      //setTyping(false);
    }, 3500); // Simulate a delay for the backend response
  };

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
