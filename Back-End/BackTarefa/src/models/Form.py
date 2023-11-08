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

class CursoForm(BaseModel):
    id: Optional[int] = None
    nome: str
    professor_id: int

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

class VinculoForm(BaseModel):
    aluno_id: int
    curso_id: int