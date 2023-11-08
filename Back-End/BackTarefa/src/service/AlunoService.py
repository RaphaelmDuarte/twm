from src.models.Form import AlunoForm, VinculoForm
from src.repository.AlunoRepository import get_All_Alunos, create_Aluno, vincula_Materia

async def getAllAlunos():
    return await get_All_Alunos()

async def createAluno(Aluno: AlunoForm):
    return await create_Aluno(Aluno)

async def vinculaMateria(vinculo: VinculoForm):
    return await vincula_Materia(vinculo)