from fastapi import APIRouter
from src.models.Form import ProfessorForm
from src.service.ProfessorService import getAllProfessores, createProfessor

professor = APIRouter(
    prefix='/professor',
    tags=['professor']
)

@professor.get('/')
async def get_all_professores():
    return await getAllProfessores()

@professor.post('/')
async def create_professor(professor: ProfessorForm):
    return await createProfessor(professor)