from fastapi import APIRouter
from src.models.Form import ProfessorForm
from src.service.ProfessorService import getAllProfessores, getProfessor, createProfessor

professor = APIRouter(
    prefix='/professor',
    tags=['professor']
)

@professor.get('/')
async def get_all_professores():
    return await getAllProfessores()

@professor.get('/{id}')
async def get_professor(id: int):
    return await getProfessor(id)

@professor.post('/')
async def create_professor(professor: ProfessorForm):
    return await createProfessor(professor)