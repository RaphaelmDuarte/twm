const express = require("express");
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors());

let clientes = [
    {
        "nome" : "Miguel",
        "email" : "miguel@teste.com",
        "endereco" : "",
        "cpf" : "123.456.789-10",
        "cep" : "38409-085",
        "bairro" : "Novo Mundo",
        "localidade" : "Av. Victor Alves Pereira",
        "cidade" : "Uberlândia",
        "uf" : "MG",
        "complemento" : "",
        "dataNascimento" : "10/10/1980",
        "idade": 45
    }
]

app.get("/", (req, res) => {
    res.send("Maravilha!!!");
})

app.get("/about", (req, res) => {
    res.send("Dentro do ABOUT!!");
})

app.get("/clientes", (req, res) => {
    res.json(clientes);
})

app.post("/alunos", (req, res) => {
    aluno = req.body;
    console.log(aluno);
    alunos.push(aluno);
    res.json(alunos);
})


app.listen(5000, ()=> console.log("SERVER IS RUNNING!!"));