from google.cloud import texttospeech, speech
from fastapi import UploadFile
import os


# Generowanie odpowiedzi chatbota (w tej wersji echo)
async def generate_response(language: str, text: str) -> dict:
    generated_text = f"Echo: {text}"
    audio_url = await generate_speech(language, generated_text)
    return {"text": generated_text, "audio_url": audio_url}


# Konwersja tekstu na mowę
async def generate_speech(language: str, text: str) -> str:
    client = texttospeech.TextToSpeechClient()

    input_text = texttospeech.SynthesisInput(text=text)
    voice = texttospeech.VoiceSelectionParams(
        language_code=language,
        ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL,
    )
    audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)

    response = client.synthesize_speech(input=input_text, voice=voice, audio_config=audio_config)

    # Zapisanie pliku audio
    file_name = "response.mp3"
    file_path = os.path.join("static", file_name)
    with open(file_path, "wb") as out:
        out.write(response.audio_content)

    return f"/static/{file_name}"


# Konwersja mowy na tekst
async def convert_speech_to_text(language: str, audio: UploadFile) -> str:
    client = speech.SpeechClient()
    content = await audio.read()

    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code=language,
    )

    response = client.recognize(config=config, audio=audio)

    for result in response.results:
        return result.alternatives[0].transcript

    raise Exception("Could not recognize speech.")
