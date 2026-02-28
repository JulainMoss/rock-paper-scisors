from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
import time
import uvicorn

app = FastAPI()

# Ważne: Musisz zezwolić na komunikację z innego portu (CORS)
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"])

@app.get("/api/random")
def get_data():
    time.sleep(1)  # Symulacja opóźnienia
    return {"wiadomosc": random.choice([0, 1, 2])}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)