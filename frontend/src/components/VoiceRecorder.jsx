import { useRef, useState} from "react";
import microphone from "../assets/icons8-mic-80.png";
import stop from "../assets/32px-Solid_white.svg.png";
import { useContext } from "react";
import { ChatContext } from "../store/ChatContext";
import axios from "axios";

const VoiceRecorder = () => {
  const { addMessage,addResponse, setIsRecording } = useContext(ChatContext);

//   const [recordedUrl, setRecordedUrl] = useState("");
  const [recording, setRecording] = useState(false);
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const startRecording = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setRecording(true);
      setIsRecording(true);
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };
      mediaRecorder.current.onstop = () => {
        const recordedBlob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(recordedBlob);
        const timestamp = Date.now();
        addMessage({ message: url, type: "audio",sender:"user", id:timestamp});
        // addDummyResponse(timestamp);
        uploadRecording(recordedBlob, timestamp+1);
        // uploadRecording(recordedBlob);
        chunks.current = [];
      };
      mediaRecorder.current.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };
  const stopRecording = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
    setRecording(false);
    setIsRecording(false)
  };

  const uploadRecording = async (blob, timestamp) => {
    console.log("Uploading recording...");
    let data = new FormData();
    data.append('audio', blob, "recording.webm");

    try {
      const transcriptionResponse = await axios.post('http://localhost:5174/transcribe', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const transcription = transcriptionResponse.data.text;
      console.log("Transcription:", transcription);
      addResponse(timestamp, transcription);
    } catch (error) {
      console.error("Error uploading recording:", error);
      addResponse(timestamp, "Failed to transcribe audio.");
    }
  };

  let recordCssClasses = 'voice';
  // let stopCssClasses = 'voice';

  if(recording) {
    recordCssClasses += ' active';
  } 
  
  return (
    <>
      {/* <audio controls src={recordedUrl} /> */}
      <button onClick={startRecording} className={recordCssClasses} disabled={recording} >
        <img src={microphone} alt="start recording" className="voice-img" />
      </button>
      <button onClick={stopRecording} className='voice' disabled={!recording}>
        <img src={stop} className="voice-stop" alt="stop recording" />
      </button>
    </>
  );
};
export default VoiceRecorder;
