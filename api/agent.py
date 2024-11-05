import os
import constants

from utils import format_sse
from typing import Iterator

from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import HumanMessage

from cdp_langchain.agent_toolkits import CdpToolkit
from cdp_langchain.utils import CdpAgentkitWrapper

def initialize_agent():
    """Initialize the agent with CDP Agentkit."""
    # Initialize LLM.
    llm = ChatOpenAI(model="gpt-4o-mini")

    # Read wallet data from environment variable
    wallet_data = os.getenv(constants.WALLET_DATA_ENV_VAR)

    print("Initialized CDP Agentkit with wallet data:", wallet_data)

    # Configure CDP Agentkit Langchain Extension.
    values = {}
    if wallet_data is not None:
        # If there is a wallet configuration in environment variables, use it
        values = {"cdp_wallet_data": wallet_data}

    agentkit = CdpAgentkitWrapper(**values)

    # Export and store the updated wallet data back to environment variable
    # wallet_data = agentkit.export_wallet()
    # print("Exporting wallet data:", wallet_data)
    # os.environ[WALLET_DATA_ENV_VAR] = wallet_data

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

def run_agent(input, agent_executor, config) -> Iterator[str]:
    """Run the agent and yield formatted SSE messages"""
    try:
        for chunk in agent_executor.stream(
            {"messages": [HumanMessage(content=input)]}, config
        ):
            if "agent" in chunk:
                content = chunk["agent"]["messages"][0].content
                if content:
                    yield format_sse(content, constants.EVENT_TYPE_AGENT)
            elif "tools" in chunk:
                content = chunk["tools"]["messages"][0].content
                if content:
                    yield format_sse(content, constants.EVENT_TYPE_TOOLS)
    except Exception as e:
        yield format_sse(f"Error: {str(e)}", constants.EVENT_TYPE_ERROR)