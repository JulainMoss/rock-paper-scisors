from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
import time
import uvicorn

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"])

@app.get("/api/random")
def get_data():
    return {"wiadomosc": random.choice([0, 1, 2])}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)