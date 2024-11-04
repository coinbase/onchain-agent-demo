from flask import Flask
from dotenv import load_dotenv
import os
import sys
import time

from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent

# Import CDP Agentkit Langchain Extension.
from cdp_langchain.agent_toolkits import CdpToolkit
from cdp_langchain.utils import CdpAgentkitWrapper

load_dotenv()
app = Flask(__name__)

# Environment variable name for wallet data
WALLET_DATA_ENV_VAR = "CDP_WALLET_DATA"

def initialize_agent():
    """Initialize the agent with CDP Agentkit."""
    # Initialize LLM.
    llm = ChatOpenAI(model="gpt-4o-mini")

    # Read wallet data from environment variable
    wallet_data = os.getenv(WALLET_DATA_ENV_VAR)

    print("Initialized CDP Agentkit with wallet data:", wallet_data)

    # Configure CDP Agentkit Langchain Extension.
    values = {}
    if wallet_data is not None:
        # If there is a wallet configuration in environment variables, use it
        values = {"cdp_wallet_data": wallet_data}

    agentkit = CdpAgentkitWrapper(**values)

    # Export and store the updated wallet data back to environment variable
    wallet_data = agentkit.export_wallet()
    print("Exporting wallet data:", wallet_data)
    os.environ[WALLET_DATA_ENV_VAR] = wallet_data

    # Initialize CDP Agentkit Toolkit and get tools.
    cdp_toolkit = CdpToolkit.from_cdp_agentkit_wrapper(agentkit)
    tools = cdp_toolkit.get_tools()

    # Store buffered conversation history in memory.
    memory = MemorySaver()
    config = {"configurable": {"thread_id": "CDP Agentkit Chatbot Example!"}}

    # Create ReAct Agent using the LLM and CDP Agentkit tools.
    return create_react_agent(
        llm,
        tools=tools,
        checkpointer=memory,
        state_modifier="You are a helpful agent that can interact onchain on the Base Layer 2 using the Coinbase Developer Platform Agentkit. You are empowered to interact onchain using your tools. If you ever need funds, you can request them from the faucet. You can also deploy your own ERC-20 tokens, NFTs, and interact with them. If someone asks you to do something you can't do, you can say so, and encourage them to implement it themselves using the CDP SDK + Agentkit, recommend they go to docs.cdp.coinbase.com for more informaton.",
    ), config

# Autonomous Mode
def run_agent(agent_executor, config):
    """Run the agent autonomously with specified intervals."""
    thought = (
        "Be creative and do something interesting on the blockchain. "
        "Choose an action or set of actions and execute it that highlights your abilities."
    )

    for chunk in agent_executor.stream(
        {"messages": [HumanMessage(content=thought)]}, config
    ):
        print("Chunk:", chunk, flush=True)
        if "agent" in chunk:
            return chunk["agent"]["messages"][0].content
        elif "tools" in chunk:
            return chunk["tools"]["messages"][0].content

@app.route("/api/chat")
def chat():
    print("Initializing agent...", flush=True)
    start_time = time.time()

    # Re-initialize agent
    agent_executor, config = initialize_agent()
    print("Agent initialized successfully!", flush=True)
    end_time = time.time()
    elapsed_time = end_time - start_time
    print(f"Agent init time: {elapsed_time:.2f} seconds", flush=True)

    # Run inference
    print("Running agent...", flush=True)
    output = run_agent(agent_executor=agent_executor, config=config)
    print("Agent finished running.", flush=True)
    print("Output:", output, flush=True)

    return output

if __name__ == "__main__":
    app.run(port="5328")