from fastapi import APIRouter
from src.models.Form import CursoForm
from src.service.CursoService import getCurso, createCurso

curso = APIRouter(
    prefix='/curso',
    tags=['curso']
)

@curso.get('/{curso}')
async def get_curso(curso: str):
    return await getCurso(curso)

@curso.post('/')
async def create_curso(curso: CursoForm):
    return await createCurso(curso)