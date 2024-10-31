import { createContext, useReducer, useState } from "react";
import PropTypes from "prop-types";

// state/context
export const ChatContext = createContext({
  messages: [{ message: "Hello, I am ChatBot!", sender: "ChatBot", id: 0 }],
  addMessage: () => {},
  setTyping: () => {},
  typing: false,  // indicator whether the chatbot ise typing/fetching data from backend
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
    messages: [{ message: "Hello, I am ChatBot!", sender: "ChatBot", id: 0 },
      { message: "I am user :)", sender: "user", id: 1 },
      { message: "How can I help you?", sender: "ChatBot", id: 2 },
    { message: "I am looking for a book", sender: "user", id:3},
    { message: "What kind of book are you looking for?", sender: "ChatBot", id: 4},
    { message: "I am looking for a book about React", sender: "user", id: 5},
    { message: "I have a few books about React. Do you want me to show them to you?", sender: "ChatBot", id: 6},
    { message: "Yes, please", sender: "user", id: 7},
    { message: "Here are some books about React: React Quickly, Learning React, and Pro React. Do you want more information about any of these books?", sender: "ChatBot", id: 8},
    { message: "Yes, please", sender: "user", id: 9},
    { message: "Which book would you like more information about?", sender: "ChatBot", id: 10},
    { message: "React Quickly", sender: "user", id: 11},
    { message: "React Quickly is a book by Azat Mardan. It is a hands-on guide to learning React. It is 240 pages long. Do you want to know more about this book?", sender: "ChatBot", id: 12},
    { message: "Yes, please", sender: "user", id: 13},
    { message: "What would you like to know about React Quickly?", sender: "ChatBot", id: 14},
    { message: "I would like to know the price", sender: "user", id: 15},
    { message: "React Quickly costs $25. Do you want to know more about this book?", sender: "ChatBot", id: 16},
    { message: "No, thank you", sender: "user", id: 17},
    { message: "You're welcome! Have a great day!", sender: "ChatBot", id: 18},
    ],
  });

  const [typing, setTyping] = useState(false);


  function addMessage(message) {
    messageDispatch({
      type: "ADD_MESSAGE",
      payload: message,
    });
  }
  const context = {
    messages: messageState.messages,
    addMessage: addMessage,
    setTyping: setTyping,
    typing: typing,
  };

  return (
    <ChatContext.Provider value={context}>{children}</ChatContext.Provider>
  );
}

ChatContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
