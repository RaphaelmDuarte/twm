from src.repository.ProfessorRepository import get_all_professors

async def getAllProfessors():
    return await get_all_professors()