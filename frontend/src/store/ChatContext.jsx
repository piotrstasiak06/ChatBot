import { createContext } from "react";

export const ChatContext = createContext({
  // context model -> only for syntax highlight purposes

  messages: [
    {
      message: "Hello, I am ChatBot!",
      sender: "ChatBot",
      id: Date.now(),
    },
  ],
  addDummyResponse: () => {}
});
