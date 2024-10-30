import { ChatContext } from "../store/chat-context";
import { useState} from "react";
import { useContext } from "react";
import VoiceRecorder from "./voiceRecorder";

export default function Input() {
  const { messages, addMessage } = useContext(ChatContext);
  const [enteredMessage, setEnteredMessage] = useState({
    message: "",
  });


  function handleInputChange(id, value) {
    setEnteredMessage((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  function handleSubmitMessage(event) {
    event.preventDefault();
    addMessage(enteredMessage);
    setEnteredMessage({ message: "" });
    console.log("Entered message: ", enteredMessage);
    console.log("Context messages: ", messages);
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
