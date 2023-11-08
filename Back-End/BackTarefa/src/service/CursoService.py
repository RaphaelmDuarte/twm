from src.models.Form import CursoForm
from src.repository.CursoRepository import create_curso

async def createCurso(curso: CursoForm):
    return await create_curso(curso)