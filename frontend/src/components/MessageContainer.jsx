import { useContext, useEffect } from "react";
import { ChatContext } from "../store/ChatContext";

export default function MessageContainer() {
  const { messages, scrollChatToBottom } = useContext(ChatContext);

  useEffect(() => {
    scrollChatToBottom();
  }, [messages, scrollChatToBottom]);

  return (
    <div className="message-container" id="message-container">
      {messages.length === 0 && <p>No messages yet.</p>}
      <ul>
        {messages.map((message) => (
          <li
            className={`message ${
              message.sender === "ChatBot" ? "chat-message" : "sender-message"
            }`}
            key={message.id}>
            <div className="message-content">
              {message.sender === "ChatBot" ? (
                <p>
                  <strong>{message.sender}:</strong>{" "}
                  {message.message.includes("...") ? (
                   
                    <span className="dots">
                      <span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </span>
                  ) : (
      
                    message.message
                  )}
                </p>
              ) : message.type === "audio" ? (
                <audio
                  controls
                  src={message.message}
                  className="audio-controls"
                />
              ) : (
                <p>{message.message}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
