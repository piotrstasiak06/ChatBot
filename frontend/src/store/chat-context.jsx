import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

export const ChatContext = createContext({
  messages: [{ message: "Hello, I am ChatBot!", sender: "ChatBot" }],
  addMessage: () => {},
});

function messageReducer(state, action) {
  if (action.type === "ADD_MESSAGE") {
    return {
      messages: state.messages.concat(action.payload),
    };
  }
  return state;
}

export default function ChatContextProvider({ children }) {
  const [messageState, messageDispatch] = useReducer(messageReducer, {
    messages: [],
  });

  function addMessage(message) {
    messageDispatch({
      type: "ADD_MESSAGE",
      payload: message,
    });
  }
  const context = {
    messages: messageState.messages,
    addMessage: addMessage,
  };

  return (
    <ChatContext.Provider value={context}>{children}</ChatContext.Provider>
  );
}

ChatContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
