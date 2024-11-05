from typing import Final

# Event types
EVENT_TYPE_AGENT: Final[str] = "agent"
EVENT_TYPE_COMPLETED: Final[str] = "completed"
EVENT_TYPE_TOOLS: Final[str] = "tools"
EVENT_TYPE_ERROR: Final[str]= "error"

# Environment variables
WALLET_DATA_ENV_VAR: Final[str] = "CDP_WALLET_DATA"

# Errors
class InputValidationError(Exception):
    """Custom exception for input validation errors"""
    pass