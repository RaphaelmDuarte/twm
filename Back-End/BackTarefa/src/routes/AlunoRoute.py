from fastapi import APIRouter
from src.models.Form import AlunoForm
from src.service.AlunoService import getAllAlunos, createAluno

aluno = APIRouter(
    prefix='/aluno',
    tags=['aluno']
)

@aluno.get('/')
async def get_all_alunos():
    return await getAllAlunos()

@aluno.post('/')
async def create_aluno(aluno: AlunoForm):
    return await createAluno(aluno)