from pydantic import BaseModel

class AlunoView(BaseModel):
    id: int
    nome: str
    email: str
    cpf: str
    endereco: str
    numero: int
    complemento: str
    cidade: str
    estado: str

class CursoView(BaseModel):
    id: int
    nome: str
    professor_id: int

class ProfessorView(BaseModel):
    id: int
    nome: str
    email: str
    cpf: str
    endereco: str
    numero: int
    complemento: str
    cidade: str
    estado: str

class VinculoView(BaseModel):
    curso_id: int
    aluno_id: int