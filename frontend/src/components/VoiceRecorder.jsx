import { useRef, useState} from "react";
import microphone from "../assets/icons8-mic-80.png";
import stop from "../assets/32px-Solid_white.svg.png";
import { useContext } from "react";
import { ChatContext } from "../store/chat-context";
import axios from "axios";

const VoiceRecorder = () => {
  const { addMessage } = useContext(ChatContext);

//   const [recordedUrl, setRecordedUrl] = useState("");
  const [recording, setRecording] = useState(false);
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setRecording(true);
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
        // setRecordedUrl(url);
        addMessage({ message: url, type: "audio" });
        uploadRecording(recordedBlob);
        chunks.current = [];
      };
      mediaRecorder.current.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };
  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
    setRecording(false);
  };

  const uploadRecording = (blob) => {
    console.log("Uploading recording...");
    let data = new FormData();
    data.append('text', "this is the transcription of the audio file");
    data.append('wavfile', blob, "recording.wav");

    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    };
    axios.post('http://localhost:8080/asr/', data, config);
  };


  let recordCssClasses = 'voice';
  // let stopCssClasses = 'voice';

  if(recording) {
    recordCssClasses += ' active';
  } 
  

  return (
    <>
      {/* <audio controls src={recordedUrl} /> */}
      <button onClick={startRecording} className={recordCssClasses} disabled={recording}>
        <img src={microphone} alt="start recording" className="voice-img" />
      </button>
      <button onClick={stopRecording} className='voice' disabled={!recording}>
        <img src={stop} className="voice-stop" alt="stop recording" />
      </button>
    </>
  );
};
export default VoiceRecorder;
