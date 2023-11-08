from settings import CONECTION
from src.models.Form import AlunoForm, VinculoForm
from src.models.View import AlunoView, VinculoView

connected = CONECTION

async def get_All_Alunos():
    Alunos = []
    query = "SELECT * FROM Aluno;"
    conn = connected
    cur = conn.cursor()
    try:
        sql = query
        cur.execute(sql)
        rows = cur.fetchall()
        for data in rows:
            Alunos.append(AlunoView(
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
        return Alunos
    except Exception as e:
        print(e)

async def create_Aluno(aluno: AlunoForm):
    query = """INSERT INTO Aluno(nome, email, cpf, endereco, numero, complemento, cidade, estado)
                VALUES('{}', '{}' , '{}', '{}', {}, '{}', '{}', '{}') RETURNING id;"""
    conn = connected
    cur = conn.cursor()
    try:
        sql = query.format(aluno.nome, aluno.email, aluno.cpf, aluno.endereco,
                           aluno.numero, aluno.complemento, aluno.cidade, aluno.estado)
        cur.execute(sql)
        id = cur.fetchone()[0]
        conn.commit()
        return AlunoView(
            id=id,
            nome=aluno.nome,
            email=aluno.email,
            cpf=aluno.cpf,
            endereco=aluno.endereco,
            numero=aluno.numero,
            complemento=aluno.complemento,
            cidade=aluno.cidade,
            estado=aluno.estado
        )
    except Exception as e:
        print(e)

async def vincula_Materia(vinculo: VinculoForm):
    query = "INSERT INTO CursoAluno(curso_id, aluno_id) VALUES({}, {});"
    conn = connected
    cur = conn.cursor()
    try:
        sql = query.format(vinculo.curso_id, vinculo.aluno_id)
        cur.execute(sql)
        conn.commit()
        return VinculoView(
            curso_id=vinculo.curso_id,
            aluno_id=vinculo.aluno_id
        )
    except Exception as e:
        print(e)