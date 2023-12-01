from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes.AlunoRoute import aluno
from src.routes.CursoRoute import curso
from src.routes.ProfessorRoute import professor
from src.routes.VinculoRoute import vinculo

origins = ["*"]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(aluno)
app.include_router(curso)
app.include_router(professor)
app.include_router(vinculo)

@app.get('/')
def getAll():
    return f'Main'