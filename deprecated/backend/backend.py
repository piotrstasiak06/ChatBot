from flask import Flask, request, jsonify
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification, pipeline
from dotenv import load_dotenv
import os
from openai import OpenAI
# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Load DistilBERT tokenizer and model for sentiment analysis
tokenizer = DistilBertTokenizer.from_pretrained("distilbert-base-uncased")
model = DistilBertForSequenceClassification.from_pretrained("distilbert-base-uncased-finetuned-sst-2-english")

# Create a pipeline for sentiment analysis
sentiment_pipeline = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)

@app.route('/test', methods=['POST'])
def handle_test():
    user_message = request.json.get('message')
    response = {
        "reply": "This is a placeholder response. In the future, this will be a sentiment-analysis-driven reply."
    }
    return jsonify(response)

@app.route('/message', methods=['POST'])
def handle_message():
    user_message = request.json.get('message')
    print(user_message)
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # Perform sentiment analysis on the user's message
    try:
        result = sentiment_pipeline(user_message)
        sentiment = result[0]['label']
        score = result[0]['score']
        # Customize response based on sentiment analysis
        if sentiment == 'POSITIVE':
            chat_response = f"Thanks for the positive message! (Confidence: {score:.2f})"
        else:
            chat_response = f"I see you might be feeling a bit negative. (Confidence: {score:.2f})"
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # Return the response based on the sentiment of the user's message
    return jsonify({"reply": chat_response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5174)
