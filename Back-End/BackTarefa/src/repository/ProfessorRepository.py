from settings import CONECTION
from src.models.View import ProfessorView

connected = CONECTION

async def get_all_professors():
    professores = []
    query = "SELECT * FROM Professor"
    conn = connected
    cur = conn.cursor()
    try:
        sql = query
        cur.execute(sql)
        rows = cur.fetchall()
        for data in rows:
            professores.append(ProfessorView(
                id=data[0],
                nome=data[1],
                email=data[2],
                cpf=data[3],
                endereco=data[4],
                numero=data[5],
                complemento=data[6],
                cidade=data[7],
                estado=data[8]
            ))
        return professores
    except Exception as e:
        print(e)