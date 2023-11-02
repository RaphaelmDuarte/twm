from settings import CONECTION
from src.models.Form import ProfessorForm
from src.models.View import ProfessorView

connected = CONECTION

async def get_all_professores():
    professores = []
    query = "SELECT * FROM Professor;"
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

async def create_professor(professor: ProfessorForm):
    query = """INSERT INTO Professor(nome, email, cpf, endereco, numero, complemento, cidade, estado)
                VALUES('{}', '{}' , '{}', '{}', {}, '{}', '{}', '{}') RETURNING id;"""
    conn = connected
    cur = conn.cursor()
    try:
        sql = query.format(professor.nome, professor.email, professor.cpf, professor.endereco,
                           professor.numero, professor.complemento, professor.cidade, professor.estado)
        cur.execute(sql)
        id = cur.fetchone()[0]
        conn.commit()
        return ProfessorView(
            id=id,
            nome=professor.nome,
            email=professor.email,
            cpf=professor.cpf,
            endereco=professor.endereco,
            numero=professor.numero,
            complemento=professor.complemento,
            cidade=professor.cidade,
            estado=professor.estado
        )
    except Exception as e:
        print(e)