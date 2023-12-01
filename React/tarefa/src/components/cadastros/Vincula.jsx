import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Col, Row, Button, Container } from "react-bootstrap";
import ModalPesquisa from "../utils/ModalPesquisa.jsx"

const cpfMask = (value) => {
    return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos ca>
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais >
}

const Vinculo = () => {
    const [idAluno, setIdAluno] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [idMateria, setIdMateria] = useState('');
    const [materia, setMateria] = useState('');
    const [professor, setProfessor] = useState('');
    const [showPesquisaAluno, setShowPesquisaAluno] = useState('');
    const [cpfPesquisa, setCpfPesquisa] = useState('');
    const [showPesquisaMateria, setShowPesquisaMateria] = useState('');
    const [materiaPesquisa, setMateriaPesquisa] = useState('');

    useEffect(() => {
        setCpfPesquisa(cpfMask(cpfPesquisa))
    }, [cpfPesquisa])

    const handlePesquisaAluno = async () => {
        const res = await axios.get(`http://localhost:8000/aluno/${cpfPesquisa}`, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        });
        const aluno = res.data
        if (aluno === null) {
            return
        }
        setIdAluno(aluno.id);
        setNome(aluno.nome);
        setCpf(aluno.cpf)
        setShowPesquisaAluno("");
    }

    const handlePesquisaMateria = async () => {
        const res = await axios.get(`http://localhost:8000/curso/${materiaPesquisa}`, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        });
        const materia = res.data
        if (materia === null) {
            return
        }
        setIdMateria(materia.id)
        setMateria(materia.nome)

        const resposta = await axios.get(`http://localhost:8000/professor/${materia.professor_id}`, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        });
        const professor = resposta.data
        setProfessor(professor.nome)
        setShowPesquisaMateria("");
    }

    const handleLimpar = () => {
        setIdAluno('');
        setNome('');
        setCpf('');
        setIdMateria('');
        setMateria('');
        setProfessor('');
        setShowPesquisaAluno('');
        setCpfPesquisa('');
        setShowPesquisaMateria('');
        setMateriaPesquisa('');
    }

    const handleSalvar = async () => {
        let vinculo = {
            "curso_id": idMateria,
            "aluno_id": idAluno
        }

        let res = await axios.post('http://localhost:8000/vinculo', vinculo, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        });
        console.log(res)
    }

    return (
        <div style={{ marginTop: '10px', marginLeft: '80px', marginRight: '20px' }}>
            <Row>
                <Col>
                    <Form style={{ margin: '5px' }}>
                        <Row>
                            <Col sm={8}>
                                <div className="txtNome" >
                                    <Form.Label className="text-left" style={{ width: "100%" }}>Nome</Form.Label>
                                    <Form.Control
                                        value={nome}
                                        onChange={e => setNome(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div className="txtCPF" >
                                    <Form.Label className="text-left" style={{ width: "100%" }}>CPF</Form.Label>
                                    <Form.Control
                                        value={cpf}
                                        onChange={e => setCpf(cpfMask(e.target.value))}
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
                                    <Button variant="primary" size="lg" onClick={e => setShowPesquisaAluno(true)}>Pesquisar</Button>{' '}
                                    <ModalPesquisa titulo={"Pesquisa de Alunos"}
                                        texto={"Digite o cpf do Aluno"}
                                        show={showPesquisaAluno}
                                        cpf={cpfPesquisa}
                                        changeNome={setCpfPesquisa}
                                        close={setShowPesquisaAluno}
                                        pesquisar={handlePesquisaAluno}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Col>
                <Col>
                    <Form style={{ margin: '5px' }}>
                        <Row>
                            <Col sm={6}>
                                <div className="txtMateria" >
                                    <Form.Label className="text-left" style={{ width: "100%" }}>Matéria</Form.Label>
                                    <Form.Control
                                        value={materia}
                                        onChange={e => setMateria(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="txtProfessor" >
                                    <Form.Label className="text-left" style={{ width: "100%" }}>Professor</Form.Label>
                                    <Form.Control
                                        value={professor}
                                        onChange={e => setProfessor(e.target.value)}
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
                                    <Button variant="primary" size="lg" onClick={e => setShowPesquisaMateria(true)}>Pesquisar</Button>{' '}
                                    <ModalPesquisa titulo={"Pesquisa de Matéria"}
                                        texto={"Digite o nome da Matéria"}
                                        show={showPesquisaMateria}
                                        cpf={materiaPesquisa}
                                        changeNome={setMateriaPesquisa}
                                        close={setShowPesquisaMateria}
                                        pesquisar={handlePesquisaMateria}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Col>
            </Row>
            <br />
            <br />
            <br />
            <Container>
                <Button variant="primary" size="lg" onClick={e => handleLimpar()}>Limpar</Button>{' '}
                <Button variant="primary" size="lg" onClick={e => handleSalvar()}>Salvar</Button>{' '}
            </Container>
        </div>
    )
}

export default Vinculo;