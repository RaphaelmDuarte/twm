from fastapi import APIRouter
from src.models.Form import AlunoForm, VinculoForm
from src.service.AlunoService import getAllAlunos, createAluno, vinculaMateria

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

@aluno.post('/vinculo')
async def vincula_materia(vinculo: VinculoForm):
    return await vinculaMateria(vinculo)