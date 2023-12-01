from fastapi import APIRouter
from src.models.Form import AlunoForm, VinculoForm
from src.service.AlunoService import getAllAlunos, getAlunoCpf, getMateriasAluno, createAluno, vinculaMateria

aluno = APIRouter(
    prefix='/aluno',
    tags=['aluno']
)

@aluno.get('/')
async def get_all_alunos():
    return await getAllAlunos()

@aluno.get('/{cpf}')
async def get_aluno_cpf(cpf: str):
    return await getAlunoCpf(cpf)

@aluno.get('/vinculo/{cpf}')
async def get_materias_aluno(cpf:str):
    return await getMateriasAluno(cpf)

@aluno.post('/')
async def create_aluno(aluno: AlunoForm):
    return await createAluno(aluno)

@aluno.post('/vinculo')
async def vincula_materia(vinculo: VinculoForm):
    return await vinculaMateria(vinculo)