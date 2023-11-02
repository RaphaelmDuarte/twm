from src.models.Form import ProfessorForm
from src.repository.ProfessorRepository import get_all_professores, create_professor

async def getAllProfessores():
    return await get_all_professores()

async def createProfessor(professor: ProfessorForm):
    return await create_professor(professor)