import { createContext } from "react";
import PropTypes from "prop-types";

export const ChatContext = createContext({
  messages: [],
  addMessage: (message) => {},
  deleteMessage: (messageId) => {},
});

function messageReducer(state,action) {
    if (action.type === "ADD_MESSAGE") {
        return {
        messages: state.messages.concat(action.payload),
        };
    }
    
    if (action.type === "DELETE_MESSAGE") {
        return {
        messages: state.messages.filter(
            (message) => message.id !== action.payload
        ),
        };
    }
    
    return state;
}

export default function ChatContextProvider({ children }) {
   const [messageState, messageDispatch] = useReducer(messageReducer, { messages: [] });

   function addMessage(message) {
       messageDispatch({
           type: "ADD_MESSAGE",
           payload: message,
       });
   }

   function deleteMessage(messageId) {
       messageDispatch({
           type: "DELETE_MESSAGE",
           payload: messageId,
       });
   }

    const context = {
         messages: messageState.messages,
         addMessage: addMessage,
         deleteMessage: deleteMessage,
    };

  return (<ChatContext.Provider value={context}>{children}</ChatContext.Provider>)
};

ChatContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

