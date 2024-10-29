import Header from "./components/Header";
import ChatContextProvider from "./store/chat-context.jsx";
// import Input from "./components/Input.jsx";
import { useEffect, useState } from "react";
import Loader from "./components/Loader.jsx";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ChatContainer,
  MainContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <ChatContextProvider>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="container">
            <MainContainer>
              <ChatContainer>
                <MessageList>
                  <Message
                    model={{
                      message: "Hello, how can I help you?",
                      sentTime: "Just now",
                      sender: "bot",
                    }}
                  />
                </MessageList>
                <MessageInput placeholder="Type a message..." />
                <TypingIndicator content="bot is typing..." />
              </ChatContainer>
            </MainContainer>
          </div>

          {/* <Input /> */}
        </>
      )}
    </ChatContextProvider>
  );
}

export default App;
