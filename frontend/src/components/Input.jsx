import { ChatContext } from "../store/ChatContext";
import { useState } from "react";
import { useContext } from "react";
import VoiceRecorder from "./VoiceRecorder.jsx";

export default function Input() {
  const { addMessage, addResponse, isRecording, isFetching } = useContext(ChatContext);
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
      console.log("Error: ",error);
      return;
    }
    const timestamp = Date.now();
    addMessage({
      id: timestamp,
      message: enteredMessage.message,
      sender: "user",
    });
    addResponse(timestamp,enteredMessage.message); 
    setEnteredMessage({ message: "" });
    setError("");

    
  }
  
  return (
    <>
      <div className="input">
        <form onSubmit={handleSubmitMessage}>
          <input
            type="text"
            name="message"
            autoComplete="off"
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
            disabled={isRecording || isFetching}
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
