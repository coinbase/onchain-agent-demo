from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/hello", methods=["GET"])
def hello():
    # Log the user input to console
    return "Hello world!"

@app.route("/agent", methods=["POST"])
def agent():
    # Get the JSON data from request
    data = request.get_json()

    print(data)

    # Log the user input to console
    return "Hello world!"

print("Server is running")
app.run()