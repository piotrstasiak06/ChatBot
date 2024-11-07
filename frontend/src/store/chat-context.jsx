import { useReducer, useState } from "react";
import PropTypes from "prop-types";
import { ChatContext } from "./ChatContext.jsx";
import { sendMessage } from "../http.js";

function messageReducer(state, action) {
  // possible actions within a state
  if (action.type === "ADD_MESSAGE") {
    return {
      messages: state.messages.concat(action.payload), // add message to current state
    };
  }
  if (action.type === "UPDATE_LAST_MESSAGE") {
    return {
      messages: state.messages.map(
        (msg, index) =>
          index === state.messages.length - 1 ? action.payload : msg // replace last message with new data ('...' for fetched response)
      ),
    };
  }
  return state;
}

export default function ChatContextProvider({ children }) {
  const [messageState, messageDispatch] = useReducer(messageReducer, {
    // state initial values
    messages: [],
  });

  const [isRecording, setIsRecording] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  function addMessage(message) {
    setIsFetching(true);
    messageDispatch({
      type: "ADD_MESSAGE",
      payload: message,
    });
  }

  // const updateLastMessage = (updatedMessage) => {
  //   setMessages((prevMessages) => {
  //     const newMessages = [...prevMessages];
  //     newMessages[newMessages.length - 1] = updatedMessage;
  //     return newMessages;
  //   });
  // };

  const updateLastMessage = (updatedMessage) => {
    messageDispatch({
      type: "UPDATE_LAST_MESSAGE",
      payload: updatedMessage,
      // payload is a object of structure :
      // {id: Date.now(),
      // message: "This is the response from ChatBot.",
      // sender: "ChatBot",}
    });
  };

  const addResponse = (timestamp, message) => {
    setTimeout(() => {
      addMessage({ id: timestamp + 1, message: "...", sender: "ChatBot" });
      setTimeout(() => {
        scrollChatToBottom();
      }, 400);
      // setTimeout(async () => {
      //   typeMessage("This is a dummy response.", timestamp + 1); // data fetching function to add here

      // }, 3000);
      setTimeout(async () => {
        try {
          const response = await fetchResponse(message);
          typeMessage(response, timestamp + 1);
        } catch (error) {
          console.error("Error fetching response:", error);
          typeMessage("Failed to fetch response.", timestamp + 1);
        }
      }, 2000);
    }, 500);
  };

  const addDummyResponse = (timestamp) => {
    setTimeout(() => {
      addMessage({ id: timestamp + 1, message: "...", sender: "ChatBot" });
      setTimeout(() => {
        scrollChatToBottom();
      }, 400);
      setTimeout(async () => {
        typeMessage("Donate some money to developers to enable this function :)", timestamp + 1); // data fetching function to add here

      }, 3000);
      
    }, 500);
  };

  const fetchResponse = async (messageData) => {
    const response = await sendMessage(messageData);
    return response;
  };

  const typeMessage = (message, timestamp) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < message.length) {
        updateLastMessage({
          id: timestamp,
          message: message.slice(0, index + 1),
          sender: "ChatBot",
        });
        index++;
      } else {
        clearInterval(interval);
        setIsFetching(false);
      }
    }, 50); // speed of typing
  };

  function scrollChatToBottom() {
    const chat = document.getElementById("message-container");
    if (chat) {
      chat.scrollTo({
        top: chat.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  // real context based on state
  const context = {
    messages: messageState.messages,
    addMessage: addMessage,
    updateLastMessage: updateLastMessage,
    addResponse: addResponse,
    isRecording: isRecording,
    setIsRecording: setIsRecording,
    scrollChatToBottom: scrollChatToBottom,
    isFetching: isFetching,
    addDummyResponse: addDummyResponse,
  };

  return (
    <ChatContext.Provider value={context}>{children}</ChatContext.Provider>
  );
}

ChatContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
