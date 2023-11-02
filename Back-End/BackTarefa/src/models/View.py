from pydantic import BaseModel

class ProfessorView(BaseModel):
    id: int
    nome: str
    email: str
    cpf: int
    endereco: str
    numero: int
    complemento: str
    cidade: str
    estado: str