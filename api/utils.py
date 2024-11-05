import json

def format_sse(data: str, event: str = None) -> str:
    """Format data as SSE"""
    response = {
        "event": event,
        "data": data
    }
    return json.dumps(response) + "\n"