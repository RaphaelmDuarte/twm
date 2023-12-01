from src.models.Form import CursoForm
from src.repository.CursoRepository import get_curso, create_curso

async def getCurso(curso: str):
    return await get_curso(curso)

async def createCurso(curso: CursoForm):
    return await create_curso(curso)