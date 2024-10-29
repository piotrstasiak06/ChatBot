import Header from "./components/Header";
import ChatContextProvider from "./store/chat-context.jsx";
import Input from "./components/Input.jsx";
import { useEffect, useState } from "react";
import Loader from "./components/Loader.jsx";

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
          <Input />
        </>
      )}
    </ChatContextProvider>
  );
}

export default App;
