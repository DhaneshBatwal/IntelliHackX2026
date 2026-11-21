import os
from pathlib import Path
from dotenv import load_dotenv

# Search for .env in current directory, backend directory, and project root
env_paths = [
    Path(__file__).parent / ".env",
    Path(__file__).parent.parent / ".env",
    Path.cwd() / ".env"
]

for p in env_paths:
    if p.exists():
        load_dotenv(dotenv_path=p)
        break
else:
    load_dotenv()

# Configuration constants
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
# Default to gemini-3.8-flash per user prompt, fallback to gemini-2.5-flash or gemini-1.5-flash
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-3.8-flash").strip()
SERPAPI_KEY = os.getenv("SERPAPI_KEY", "").strip()
SUPABASE_URL = os.getenv("SUPABASE_URL", "").strip()
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY", "").strip()

PORT = int(os.getenv("PORT", "8000"))
HOST = os.getenv("HOST", "0.0.0.0")
