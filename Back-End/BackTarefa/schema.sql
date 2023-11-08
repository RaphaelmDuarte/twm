CREATE TABLE Aluno(
    id BigSerial PRIMARY KEY,
    nome varchar(45),
    email varchar(45),
    cpf int,
    endereco varchar(45),
    numero int,
    complemento varchar(45),
    cidade varchar(45),
    estado varchar(2),
    CONSTRAINT aluno_cpf_uk UNIQUE (cpf)
);

CREATE TABLE Professor(
    id BigSerial PRIMARY KEY,
    nome varchar(45),
    email varchar(45),
    cpf varchar(20),
    endereco varchar(45),
    numero int,
    complemento varchar(45),
    cidade varchar(45),
    estado varchar(2),
    CONSTRAINT professor_cpf_uk UNIQUE (cpf)
);

CREATE TABLE Curso(
    id BigSerial PRIMARY KEY,
    nome varchar(45),
    professor_id int,
    CONSTRAINT professor_fk FOREIGN KEY (professor_id) REFERENCES Professor(id),
    CONSTRAINT professor_curso_uk UNIQUE (nome, professor_id)
);

CREATE TABLE CursoAluno(
    curso_id int,
    aluno_id int,
    CONSTRAINT curso_fk FOREIGN KEY (curso_id) REFERENCES Curso(id),
    CONSTRAINT aluno_fk FOREIGN KEY (aluno_id) REFERENCES Aluno(id),
    CONSTRAINT curso_aluno_uk UNIQUE (curso_id, aluno_id)
);