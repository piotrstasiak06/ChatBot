from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/test', methods=['POST'])
def handle_message():
    # For now, respond with a basic message
    user_message = request.json.get('message')
    response = {
        "reply": "This is a placeholder response. In the future, this will be a ChatGPT-generated reply."
    }
    return jsonify(response)
@app.route('/message', methods=['POST'])
def handle_message1():
    user_message = request.json.get('message')
    ## 1. wyciagniecie z jsona info
    ## 2. wyslanie tego do openai
    ## 3. zwrocenie responsem
    response = {
        "reply": "ua dzwoni"
    }
    return jsonify(response)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5174)