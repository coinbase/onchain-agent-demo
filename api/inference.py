import time
import constants
from typing import Iterator

from agent import initialize_agent, run_agent
from utils import format_sse

def run_inference(input: str = "Be creative and do something interesting on the blockchain. Choose an action or set of actions and execute it in a way that highlights your abilities.") -> Iterator[str]:
    """Initialize agent, run inference and yield SSE responses"""
    start_time = time.time()
    print("Running agent...", flush=True)
    
    try:
        agent_executor, config = initialize_agent()
        print(f"Agent init time: {time.time() - start_time:.2f} seconds", flush=True)
        
        for response in run_agent(input, agent_executor=agent_executor, config=config):
            yield response
    except Exception as e:
        print(f"Error during inference: {str(e)}", flush=True)
        yield format_sse(f"Error: {str(e)}", constants.EVENT_TYPE_ERROR)
    finally:
        print("Agent finished running.", flush=True)
        yield format_sse("Agent finished", constants.EVENT_TYPE_COMPLETED)