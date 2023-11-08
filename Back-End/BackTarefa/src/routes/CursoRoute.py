from fastapi import APIRouter
from src.models.Form import CursoForm
from src.service.CursoService import createCurso

curso = APIRouter(
    prefix='/curso',
    tags=['curso']
)

@curso.post('/')
async def create_curso(curso: CursoForm):
    return await createCurso(curso)