import React, { useState, useEffect } from "react";
import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import axios from "axios";
import ModalAlert from "../utils/Modal";

const Cursos = (props) => {
    const [nome, setNome] = useState('');
    const [professores, setProfessores] = useState([]);
    const [successModal,    setShowSuccess]    = useState(false);
    const [errorModal,    setShowError]    = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/professor/')
            .then(response => {
                const professoresData = response.data;
                setProfessores(professoresData);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [])

    const handleNovo = () => {
        setNome('');
    }

    const handleSalvar = async () => {
        const control = document.getElementsByClassName("comboProfessor")
        const selected = control[0].getElementsByClassName("form-control")
        const professorId = selected[0].options[selected[0].selectedIndex]
        const curso = {
            "nome": nome,
            "professor_id": professorId.value
        }
        console.log(curso)
        const res = await axios.post('http://localhost:8000/curso', curso, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        });
        console.log(res);
        if (res.data !== null) {
            setShowSuccess(true);
        } else {
            setShowError(true)
        }
    }

    return (
        <div>
            <div className="CadastroCursos">
                <div className="ContainerCadastro" style={{ marginTop: '10px', marginLeft: '50px' }}>
                    <h2>Cadastro de Cursos</h2>
                </div>
                <div className="Formulario" style={{ marginTop: '10px', marginLeft: '80px', marginRight: '20px' }}>
                    <Form style={{ margin: '5px' }}>
                        <Row>
                            <Col sm={6}>
                                <div className="txtNome">
                                    <Form.Label className="text-left" style={{ width: "100%" }}>Nome</Form.Label>
                                    <Form.Control
                                        value={nome}
                                        onChange={e => setNome(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="comboProfessor" >
                                    <Form.Label className="text-left" style={{ width: "100%" }}>Professor</Form.Label>
                                    <Form.Control as="select" defaultValue="Selecione..." >
                                        <option>Selecione...</option>
                                        {professores.map(professor => (
                                            <option key={professor.id} value={professor.id}>
                                                {professor.nome}
                                            </option>
                                        ))}
                                    </Form.Control>
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
                                    <Button variant="primary" size="lg" onClick={e=>handleNovo()}>Limpar</Button>{' '}
                                </Col>
                                <Col>
                                    <Button variant="primary" size="lg" onClick={e=>handleSalvar()}>Salvar</Button>{' '}
                                </Col>
                            </Row>
                        </Container>    
                    </div>
                </div>
            </div>
            <ModalAlert 
            titulo={"Salvo"}
            texto={"Professor salvo com sucesso"}
            show={successModal}
            close={setShowSuccess}
            />
            <ModalAlert 
            titulo={"Salvo"}
            texto={"Erro ao salvar"}
            show={errorModal}
            close={setShowError}
            />
        </div>
    )
};

export default Cursos;