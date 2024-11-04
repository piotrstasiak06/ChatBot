# ChatBot
Chat Bot with OpenAI API
W projekcie muszązostać skonfigurowane reguły CORS.

# Uruchomienie apki

cd ChatBot -> cd Frontend -> npm install -> npm run dev -> http://localhost:5173

# Backend / ENDPOINTY

-> **POST** 

1. Handle both text and voice file uploads.If the request contains a text field, it processes the text data.
2. Process the uploaded data and return the appropriate response.If the request contains a wavfile field, it saves and processes the audio file.
3. Returns data in JSON format e.g {"message" : "This is dummy response"}

***Proposed Usage***
* curl -X POST -F "text=Hello, this is a test message" http://localhost:5000/upload
* curl -X POST -F "wavfile=@path/to/your/recording.wav" http://localhost:5000/upload
* 
# Preview nowoczesnego designu

![image](https://github.com/user-attachments/assets/bcaa0cf8-6ade-4e6b-9d85-0b7fa450afe6)


