import { useContext } from "react";
import { ChatContext } from "../store/chat-context";

export default function MessageContainer() {

    const { messages } = useContext(ChatContext);

    if (messages.length === 0) {
        return <div className="message-container">No messages yet.</div>;
      }
    return (
        // list of messages from context : 
        // export const ChatContext = createContext({
        //     messages: [{ message: "Hello, I am ChatBot!", sender: "ChatBot" }],
        //     addMessage: () => {},
        //   });
          
        //   function messageReducer(state, action) {
        //     if (action.type === "ADD_MESSAGE") {
        //       return {
        //         messages: state.messages.concat(action.payload),
        //       };
        //     }
        //     return state;
        //   }
          
        //   export default function ChatContextProvider({ children }) {
        //     const [messageState, messageDispatch] = useReducer(messageReducer, {
        //       messages: [],
        //     });
          
        //     function addMessage(message) {
        //       messageDispatch({
        //         type: "ADD_MESSAGE",
        //         payload: message,
        //       });
        //     }
        //     const context = {
        //       messages: messageState.messages,
        //       addMessage: addMessage,
        //     };
        
        
          
        <div className="message-container">
      <ul>
        {messages.map((message) => (
          <li
            className={`message ${
              message.sender === "ChatBot" ? "chat-message" : "sender-message"
            }`}
            key={message.id}
          >
            <div className="message-content">
              {message.sender === "ChatBot" ? (
                  <p><strong>{message.sender}:</strong> {message.message}</p>
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