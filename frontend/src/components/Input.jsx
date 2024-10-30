import { ChatContext } from "../store/chat-context";
import { useState} from "react";
import { useContext } from "react";
import VoiceRecorder from "./voiceRecorder";

export default function Input() {
  const { messages, addMessage } = useContext(ChatContext);
  const [error, setError] = useState('');
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
    addMessage(enteredMessage.message);
    setEnteredMessage({ message: "" });
    setError("");
    console.log("Entered message: ", enteredMessage);
    console.log("Context messages: ", messages);
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
            <VoiceRecorder/>
            <button type="submit">{"\u279C"}</button>
          </div>
        </form>
      </div>
    </>
  );
}
