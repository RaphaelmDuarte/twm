from fastapi import APIRouter
from src.service.ProfessorService import getAllProfessors

professor = APIRouter(
    prefix='/professor',
    tags=['professor']
)

@professor.get('/')
async def get_all_professores():
    return await getAllProfessors()