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