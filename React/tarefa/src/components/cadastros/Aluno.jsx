import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import ModalPesquisa from '../utils/ModalPesquisa';

const cpfMask = (value) => {
    return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos ca>
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais >
}

const cepMask = (value) => {
    if (!value) return "";
    return value.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1-$2');
}

const Alunos = (props) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cpf, setCPF] = useState('');
    const [cep, setCEP] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUF] = useState('');
    const [complemento, setComplemento] = useState('');
    const [numeroCasa, setNumeroCasa] = useState(0);
    const [showPesquisa, setShowPesquisa] = useState(false);
    const [cpfPesquisa, setCpfPesquisa] = useState('');
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        BuscaCEP(cep);
    }, [cep]);

    useEffect(() => {
        setCpfPesquisa(cpfMask(cpfPesquisa))
    }, [cpfPesquisa])

    const BuscaCEP = async (cep) => {
        if ((String(cep).length) === 10) {
            let cepSemPonto = cep.replace('-', '').replace('.', '');
            axios.get((`https://viacep.com.br/ws/${cepSemPonto}/json`)).then((response) => {
                setEndereco(response.data.logradouro);
                setBairro(response.data.bairro);
                setCidade(response.data.localidade);
                setUF(response.data.uf);
            })
        }
    }

    const handleNovo = () => {
        setNome("");
        setEmail("");
        setCPF("");
        setCEP("");
        setEndereco("");
        setNumeroCasa(0);
        setComplemento("");
        setCidade("");
        setUF("");
        setBairro("");
        setCursos("");
    }

    const handleSalvar = async () => {
        let aluno = {
            "nome": nome,
            "email": email,
            "endereco": endereco,
            "cpf": cpf,
            "cep": cep,
            "numero": numeroCasa,
            "bairro": bairro,
            "cidade": cidade,
            "estado": uf,
            "complemento": complemento
        }

        await axios.post('http://localhost:8000/aluno', aluno, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        });
    }

    const handlePesquisa = async () => {
        const res = await axios.get(`http://localhost:8000/aluno/${cpfPesquisa}`, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        });
        console.log(res);
        let aluno = res.data
        if (aluno === null) {
            return
        }
        setNome(aluno.nome)
        setEmail(aluno.email)
        setEndereco(aluno.endereco)
        setCPF(aluno.cpf)
        setCidade(aluno.cidade)
        setUF(aluno.estado)
        setComplemento(aluno.complemento)
        setNumeroCasa(aluno.numero)
        setShowPesquisa(false)
        setCpfPesquisa('')

        const resposta = await axios.get(`http://localhost:8000/aluno/vinculo/${cpfPesquisa}`, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        });
        let cur = resposta.data
        if (cur === null) {
            return
        }
        setCursos(cur)
        console.log(cur)
    }

    const renderCursos = () => {
        if (cursos.length === 0) {
            return null;
        }

        return (
        <div style={{ marginTop: '10px', marginLeft: '80px', marginRight: '20px' }}>
            <div style={{ marginTop: '10px', marginLeft: '50px' }}>
                <h2>Matérias</h2>
            </div>
            {cursos.map((curso, index) => (
                <div className='cursos' key={index}>
                    <Row>
                        <Col sm={4} style={{ border: 'solid lightgrey 2px' }}>
                            <label>{curso.aluno}</label>
                        </Col>
                        <Col sm={4} style={{ border: 'solid lightgrey 2px' }}>
                            <label>{curso.curso}</label>
                        </Col>
                        <Col sm={4} style={{ border: 'solid lightgrey 2px' }}>
                            <label>{curso.professor}</label>
                        </Col>
                    </Row>
                </div>
            ))}
        </div>
        )
    };

    return (
        <div>
            <div className="CadastroAlunos">
                <div className="ContainerCadastro" style={{ marginTop: '10px', marginLeft: '50px' }}>
                    <h2>Cadastro de Alunos</h2>
                </div>
                <div className="Formulario" style={{ marginTop: '10px', marginLeft: '80px', marginRight: '20px' }}>
                    <Form style={{ margin: '5px' }}>
                        <Row>
                            <Col sm={4}>
                                <div className="txtNome" >
                                    <Form.Label className="text-left" style={{ width: "100%" }}>Nome</Form.Label>
                                    <Form.Control
                                        value={nome}
                                        onChange={e => setNome(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div className="txtEmail" >
                                    <Form.Label className="text-left" style={{ width: "100%" }}>E-mail</Form.Label>
                                    <Form.Control type='email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div className="txtCPF" >
                                    <Form.Label className="text-left" style={{ width: "100%" }}>CPF</Form.Label>
                                    <Form.Control
                                        value={cpf}
                                        onChange={e => setCPF(cpfMask(e.target.value))}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={2}>
                                <div className="txtCEP" >
                                    <Form.Label className="text-left" style={{ width: "100%" }}>CEP</Form.Label>
                                    <Form.Control type='text' maxLength="10"
                                        value={cep}
                                        onChange={e => setCEP(cepMask(e.target.value))}
                                    />
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div className="txtEndereco" >
                                    <Form.Label className="text-left" style={{ width: "100%" }}>Endereco</Form.Label>
                                    <Form.Control
                                        value={endereco}
                                        onChange={e => setEndereco(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col sm={2}>
                                <div className="txtNumero" >
                                    <Form.Label className="text-left" style={{ width: "100%" }}>Número</Form.Label>
                                    <Form.Control
                                        value={numeroCasa}
                                        onChange={e => setNumeroCasa(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div className="txtComplemento" >
                                    <Form.Label className="text-left" style={{ width: "100%" }}>Complemento</Form.Label>
                                    <Form.Control
                                        value={complemento}
                                        onChange={e => setComplemento(e.target.value)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <div className="txtCidade" >
                                    <Form.Label className="text-left" style={{ width: "100%" }}>Cidade</Form.Label>
                                    <Form.Control
                                        value={cidade}
                                        onChange={e => setCidade(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col sm={2}>
                                <div className="txtUF" >
                                    <Form.Label className="text-left" style={{ width: "100%" }}>Estado</Form.Label>
                                    <Form.Control
                                        value={uf}
                                        onChange={e => setUF(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="txtBairro" >
                                    <Form.Label className="text-left" style={{ width: "100%" }}>Bairro</Form.Label>
                                    <Form.Control
                                        value={bairro}
                                        onChange={e => setBairro(e.target.value)}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Form>
                    <br />
                    <br />
                    <br />
                    <div>
                        <Container>
                            <Row>
                                <Col>
                                    <Button variant="primary" size="lg" onClick={e => handleNovo()}>Novo</Button>{' '}
                                </Col>
                                <Col>
                                    <Button variant="primary" size="lg" onClick={e => handleSalvar()}>Salvar</Button>{' '}
                                </Col>
                                <Col>
                                    <Button variant="primary" size="lg" onClick={e => setShowPesquisa(true)}>Pesquisar</Button>{' '}
                                    <ModalPesquisa titulo={"Pesquisa de Aluno"}
                                        texto={"Digite o cpf do Aluno"}
                                        show={showPesquisa}
                                        cpf={cpfPesquisa}
                                        changeNome={setCpfPesquisa}
                                        close={setShowPesquisa}
                                        pesquisar={handlePesquisa}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
            {renderCursos()}
        </div>
    )
}
export default Alunos;