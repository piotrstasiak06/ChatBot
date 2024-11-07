from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from app.services import generate_response, convert_speech_to_text, generate_speech

router = APIRouter()

class ChatInput(BaseModel):
    language: str
    text: str

@router.post("/chat/")
async def chat(input_data: ChatInput):
    try:
        response = await generate_response(input_data.language, input_data.text)
        return {"text_response": response["text"], "audio_response": response["audio_url"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/speech-to-text/")
async def speech_to_text(language: str, audio: UploadFile = File(...)):
    try:
        text = await convert_speech_to_text(language, audio)
        return {"text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/text-to-speech/")
async def text_to_speech(language: str, text: str):
    try:
        audio_url = await generate_speech(language, text)
        return {"audio_response": audio_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
