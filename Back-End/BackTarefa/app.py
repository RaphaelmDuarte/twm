from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes.ProfessorRoute import professor

origins = ["*"]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(professor)

@app.get('/')
def getAll():
    return f'Main'