from src.models.Form import VinculoForm
from src.repository.VinculoRepository import vincula_curso

async def vinculaCurso(vinculoForm: VinculoForm):
    return await vincula_curso(vinculoForm)