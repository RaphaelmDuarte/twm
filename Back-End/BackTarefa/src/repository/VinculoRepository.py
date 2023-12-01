from settings import CONECTION
from src.models.Form import VinculoForm
from src.models.View import VinculoView

connected = CONECTION

async def vincula_curso(vinculoForm: VinculoForm):
    query = "INSERT INTO CursoAluno(curso_id, aluno_id) VALUES({}, {});"
    conn = connected
    cur = conn.cursor()
    try:
        sql = query.format(vinculoForm.curso_id, vinculoForm.aluno_id)
        cur.execute(sql)
        conn.commit()
        return VinculoView(
            curso_id=vinculoForm.curso_id,
            aluno_id=vinculoForm.aluno_id
        )
    except Exception as e:
        print(e)