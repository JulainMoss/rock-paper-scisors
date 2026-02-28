from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
import time
import uvicorn

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"])

@app.get("/api/random")
def get_random():
    return {"wiadomosc": random.choice([0, 1, 2])}

@app.get("/api/other-random")
def get_random_with_delay():
    time.sleep(1)
    return {"wiadomosc": random.choice([0, 1, 2])}

@app.get("/api/log-in")
def log_in():
    return {"wiadomosc": "Zalogowano pomyślnie!"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)