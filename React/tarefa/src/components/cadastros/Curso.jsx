import React, { useState, useEffect } from "react";
import { Form, Col, Row } from 'react-bootstrap';
import axios from "axios";

const Cursos = (props) => {
    const [nome, setNome] = useState('');
    const [professores, setProfessores] = useState([]);

    useEffect(() => {
        /* const professoresData = [{"id": 1, "nome": "Raphael"}, {"id": 2, "nome": "Jorge"}]; // Assuming the response data is an array of options
        setProfessores(professoresData);
        console.log(professores) */
        // Make an HTTP request and update state with the response data
        axios.get('http://localhost:8000/professor')
            .then(response => {
                const professoresData = response.data;
                setProfessores(professoresData);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [])

    return (
        <div>
            <div className="CadastroCursos">
                <div className="ContainerCadastro" style={{ marginTop: '10px', marginLeft: '50px' }}>
                    <h2>Cadastro de Cursos</h2>
                </div>
                <div className="Formulario" style={{ marginTop: '10px', marginLeft: '80px', marginRight: '20px' }}>
                    <Form style={{ margin: '5px' }}>
                        <Row>
                            <Col sm={4}>
                                <div className="txtNome">
                                    <Form.Label className="text-left" style={{ width: "100%" }}>Nome</Form.Label>
                                    <Form.Control
                                        value={nome}
                                        onChange={e => setNome(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col sm={4}>
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

                </div>
            </div>
        </div>
    )
};

export default Cursos;