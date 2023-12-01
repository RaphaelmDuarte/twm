from fastapi import APIRouter
from src.models.Form import VinculoForm
from src.service.VinculoService import vinculaCurso

vinculo = APIRouter(
    prefix='/vinculo',
    tags=['vinculo']
)

@vinculo.post('/')
async def vincula_curso(vinculoForm: VinculoForm):
    return await vinculaCurso(vinculoForm)