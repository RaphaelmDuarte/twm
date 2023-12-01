from src.models.Form import AlunoForm, VinculoForm
from src.repository.AlunoRepository import get_All_Alunos, get_aluno_cpf, get_materias_aluno, create_Aluno, vincula_Materia

async def getAllAlunos():
    return await get_All_Alunos()

async def getAlunoCpf(cpf: str):
    return await get_aluno_cpf(cpf)

async def getMateriasAluno(cpf: str):
    return await get_materias_aluno(cpf)

async def createAluno(Aluno: AlunoForm):
    return await create_Aluno(Aluno)

async def vinculaMateria(vinculo: VinculoForm):
    return await vincula_Materia(vinculo)