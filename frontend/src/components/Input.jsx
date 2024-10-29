import { ChatContext } from "../store/chat-context";
import { useState } from "react";
import { useContext } from "react";
// import clip from '../assets/clip.png'

export default function Input() {
  const { messages, addMessage } = useContext(ChatContext);

  const [enteredMessage, setEnteredMessage] = useState({
    message: "",
  });

  function handleInputChange(id, value) {
    setEnteredMessage((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  function handleSubmitMessage(event) {
    event.preventDefault();
    addMessage(enteredMessage);
    setEnteredMessage({ message: "" });
    console.log("Entered message: ", enteredMessage);
    console.log("Context messages: ", messages);
  }

  return (
    <>
      <div className="input">
        <form onSubmit={handleSubmitMessage}>
          <input
            type="text"
            name="message"
            placeholder="Type a message..."
            onChange={(event) =>
              handleInputChange("message", event.target.value)
            }
            value={enteredMessage.message}
          />
          <div className="button-row">
            <button>
              <svg
                fill="#fff"
                height="24px"
                width="24px"
                viewBox="0 0 330.591 330.591">
                <g>
                  <g>
                    <path
                      d="M52.575,320.395c-0.693,0-1.391-0.015-2.09-0.043c-12.979-0.54-25.361-6.071-34.865-15.576
                    c-9.504-9.504-15.035-21.886-15.576-34.864c-0.549-13.213,4.115-25.456,13.133-34.475L221.581,27.033
                    c11.523-11.523,27.197-17.483,44.096-16.78c16.676,0.693,32.594,7.81,44.822,20.037c12.228,12.229,19.346,28.147,20.037,44.823
                    c0.703,16.911-5.256,32.571-16.781,44.096L156.711,276.255c-2.928,2.927-7.676,2.928-10.607,0c-2.928-2.93-2.928-7.678,0-10.608
                    l157.045-157.047c8.523-8.522,12.928-20.194,12.4-32.865c-0.537-12.906-6.098-25.279-15.658-34.84
                    c-9.559-9.56-21.932-15.119-34.838-15.656c-12.67-0.533-24.344,3.876-32.865,12.399L23.784,246.044
                    c-12.596,12.594-11.498,34.184,2.443,48.125c6.836,6.837,15.672,10.813,24.881,11.195c8.975,0.349,17.229-2.734,23.244-8.752
                    l169.441-169.439c7.422-7.422,6.691-20.229-1.629-28.549c-4.113-4.114-9.414-6.505-14.924-6.733
                    c-5.289-0.212-10.115,1.595-13.625,5.106L95.536,215.08c-2.93,2.927-7.678,2.928-10.607,0c-2.93-2.93-2.93-7.678,0-10.607
                    L203.008,86.39c6.512-6.512,15.322-9.9,24.855-9.486c9.281,0.385,18.127,4.332,24.906,11.114
                    c14.17,14.167,14.9,36.49,1.631,49.762L84.959,307.22C76.418,315.76,64.985,320.395,52.575,320.395z"
                    />
                  </g>
                </g>
              </svg>
            </button>
            <button type="submit">{"\u279C"}</button>
          </div>
        </form>
      </div>
    </>
  );
}
