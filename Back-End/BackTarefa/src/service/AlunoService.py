from src.models.Form import AlunoForm
from src.repository.AlunoRepository import get_all_Alunos, create_Aluno

async def getAllAlunos():
    return await get_all_Alunos()

async def createAluno(Aluno: AlunoForm):
    return await create_Aluno(Aluno)