from settings import CONECTION
from src.models.Form import CursoForm
from src.models.View import CursoView

connected = CONECTION

async def create_curso(curso: CursoForm):
    query = "INSERT INTO Curso(nome, professor_id) VALUES('{}', {}) RETURNING id;"
    conn = connected
    cur = conn.cursor()
    try:
        sql = query.format(curso.nome, curso.professor_id)
        cur.execute(sql)
        row = cur.fetchone()
        conn.commit()
        return CursoView(
            id=row[0],
            nome=curso.nome,
            professor_id=curso.professor_id
        ) 
    except Exception as e:
        print(e)