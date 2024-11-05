from flask import Flask, request, Response, stream_with_context, jsonify
from dotenv import load_dotenv
from inference import run_inference
from constants import InputValidationError

load_dotenv()
app = Flask(__name__)


@app.route("/api/chat", methods=['POST'])
def chat():
    try:
        data = request.get_json()
        if not data or 'input' not in data:
            raise InputValidationError('Input must be provided')

        return Response(
            stream_with_context(run_inference(data['input'])),
            mimetype='text/event-stream',
            headers={
                'Cache-Control': 'no-cache',
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive',
                'X-Accel-Buffering': 'no'
            }
        )
    except InputValidationError as e:
        return jsonify({'error': 'Invalid request: Missing required input'}), 400
    except Exception as e:
        app.logger.error(f"Unexpected error in chat endpoint: {str(e)}")
        return jsonify({'error': 'An unexpected error occurred'}), 500

if __name__ == "__main__":
    app.run(port="5328")