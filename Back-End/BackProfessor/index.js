const express = require("express");
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors());

id_cliente_global = 1;

let clientes = [
    {
        "id": 1,
        "nome" : "Miguel",
        "email" : "miguel@teste.com",
        "endereco" : "",
        "cpf" : "123.456.789-10",
        "cep" : "38.409-085",
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
    res.send("Rest!!!");
})

app.get("/about", (req, res) => {
    res.send("Dentro do ABOUT!!");
})

app.get("/clientes/:name", (req, res) => {
    cliente = req.params.name;
    cliente_retorno = {}
    for (let i=0; i<clientes.lengh; i++) {
        if (cliente == clientes[i].nome) {
            console.log("Achei!");
            res.json(clientes);
            cliente_retorno = cliente[i];
            break
        }
    }
    res.json(cliente_retorno);
})

app.post("/clientes", (req, res) => {
    let cliente = req.body;
    id_cliente_global++;
    cliente.id = id_cliente_global;
    console.log(cliente);
    clientes.push(cliente);
    res.json(clientes);
})

app.put("/clientes", (req, res) => {
    cliente = req.body;
    cliente_retorno = {}
})

app.listen(5000, ()=> console.log("SERVER IS RUNNING!!"));