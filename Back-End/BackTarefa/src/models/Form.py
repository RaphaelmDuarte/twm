from pydantic import BaseModel
from typing import Optional

class AlunoForm(BaseModel):
    id: Optional[int] = None
    nome: str
    email: str
    cpf: str
    endereco: str
    numero: int
    complemento: str
    cidade: str
    estado: str

class ProfessorForm(BaseModel):
    id: Optional[int] = None
    nome: str
    email: str
    cpf: str
    endereco: str
    numero: int
    complemento: str
    cidade: str
    estado: str