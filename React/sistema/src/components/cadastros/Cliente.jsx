import React, {useState, useEffect} from 'react'
import { Form, Col, Row, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import ModalPesquisa from '../utils/ModalPesquisa';

const cpfMask = (value) => {
    console.log('Dentro do CPF');
    return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos ca>
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais >
}

const cepMask = (value) => {    
        if (!value) return "";
        return value.replace(/\D/g,'')
            .replace(/(\d{2})(\d)/,'$1.$2')
            .replace(/(\d{3})(\d)/,'$1-$2');   
}

const dateMask = (value) => {
    return value
    .replace(/\D/g, '') 
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1/$2')
}

const Clientes = (props) => {
    const [nome,            setNome]            = useState('');
    const [email,           setEmail]           = useState('');
    const [endereco,        setEndereco]        = useState('');
    const [cpf,             setCPF]             = useState('');
    const [cep,             setCEP]             = useState('');
    const [bairro,          setBairro]          = useState('');
    const [cidade,          setCidade]          = useState('');
    const [uf,              setUF]              = useState('');
    const [complemento,     setComplemento]     = useState('');
    const [dataNascimento,  setDataNascimento]  = useState('');
    const [numeroCasa,      setNumeroCasa]      = useState(0);
    const [idade,           setIdade]           = useState(0);
    const [novoRegistro,    setNovoRegistro]    = useState(true);
    const [showPesquisa,    setShowPesquisa]    = useState(false);
    const [nomePesquisa,    setNomePesquisa]    = useState('');

    useEffect(() => {   
      if (novoRegistro === false) {     
        axios.get(("http://localhost:5000/clientes")).then((response) => {
            setNome(response.data[0].nome);
            setEmail(response.data[0].email);
            setCPF(response.data[0].cpf);
            setCEP(response.data[0].cep);
            setDataNascimento(response.data[0].dataNascimento)
        })
      }
    },[novoRegistro])

    useEffect(() => {
         BuscaCEP(cep);
    }, [cep]);

    useEffect(() => {
        CalculaIdade(dataNascimento);
    }, [dataNascimento]);


    const CalculaIdade = (dataNascimento) => {
        if ((String(dataNascimento).length) === 10) {
            let [dia, mes, ano] = dataNascimento.split('/');
            let dataNasc = new Date(+ano, +mes - 1, +dia);
            let hoje        = new Date();
            let idade       = hoje.getFullYear() - dataNasc.getFullYear();
            setIdade(idade);
            return idade;    
        } else if((String(dataNascimento).length) === 0) {
            setIdade(0)
        } 
    }


    const BuscaCEP = async (cep) => {
        if((String(cep).length) === 10) {
            let cepSemPonto = cep.replace('-','').replace('.', '');
            axios.get((`https://viacep.com.br/ws/${cepSemPonto}/json`)).then((response) => {
                setEndereco(response.data.logradouro);
                setBairro(response.data.bairro);
                setCidade(response.data.localidade);
                setUF(response.data.uf);
            })
        }        
    }

    const handleNovo = () => {
        setNovoRegistro(true);
        setNome("");
        setEmail("");
        setCPF("");
        setCEP(""); 
        setEndereco("");
        setBairro("");
        setCidade("");
        setUF("");
        setDataNascimento("");   
    }

    const handleSalvar = async () => {
     let cliente = {
                "nome" : nome,
                "email" : email,
                "endereco" : "",
                "cpf" : cpf,
                "cep" : cep,
                "bairro" : bairro,
                "cidade" : cidade, 
                "uf" : uf,
                "complemento" : complemento,
                "dataNascimento" : dataNascimento,
                "idade": idade
            }

            console.warn(cliente);

            await axios.post('http://localhost:5000/clientes', cliente, {
                headers: {
                  // Overwrite Axios's automatically set Content-Type
                  'Content-Type': 'application/json'
                }
              });
    }

    const handlePesquisa = async () => {
        let cliente_json = {"nome": nomePesquisa}
        
        const res = await axios.get(`http://localhost:5000/clientes/${nomePesquisa}`, {params: {cliente_json}}, {
            headers: {
              // Overwrite Axios's automatically set Content-Type
              'Content-Type': 'application/json'
            }
          });
        console.log(res);
    }

    return (
        <div>
            <div className="CadastroClientes">
                <div className="ContainerCadastro" style={{marginTop: '10px',marginLeft:'70px'}}>
                    <h2>Cadastro de Clientes</h2>
                </div>
                <div className="Formulario" style={{marginTop: '10px',marginLeft:'80px',marginRight:'20px'}}>
                    <Form style={{ margin: '5px', marginLeft:'80px'}}>
                        <Row>
                            <Col sm={4}>
                                <div className="txtNome" >
                                <Form.Label className="text-left" style={{ width: "100%" }}>Nome</Form.Label>
                                <Form.Control
                                    value={nome}
                                    onChange={e=>setNome(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div className="txtEmail" >
                                    <Form.Label className="text-left" style={{ width: "100%" }}>E-mail</Form.Label>
                                    <Form.Control type='email'
                                        value={email}
                                        onChange={e=>setEmail(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col sm={2}>
                                <div className="txtCPF" >
                                <Form.Label className="text-left" style={{ width: "100%" }}>CPF</Form.Label>
                                <Form.Control
                                    value={cpf}
                                    onChange={e=>setCPF(cpfMask(e.target.value))}
                                    />
                                </div>
                            </Col>
                            <Col sm={2}>
                                <div className="comboSexo" >
                                    <Form.Label className="text-left" style={{ width: "100%" }}>Sexo</Form.Label>
                                    <Form.Control as="select" defaultValue="Selecione..." >
                                        <option>Masculino</option>
                                        <option>Feminino</option>
                                    </Form.Control>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={2}>
                                 <div className="txtCEP" >
                                     <Form.Label className="text-left" style={{ width: "100%" }}>CEP</Form.Label>
                                     <Form.Control type='text'  maxLength="10"
                                     value={cep}
                                     onChange={e=>setCEP(cepMask(e.target.value))}
                                     />
                                 </div>
                             </Col>
                             <Col sm={4}>
                                <div className="txtEndereco" >
                                <Form.Label className="text-left" style={{ width: "100%" }}>Endereco</Form.Label>
                                <Form.Control
                                    value={endereco}
                                    onChange={e=>setEndereco(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col sm={2}>
                                <div className="txtNumero" >
                                <Form.Label className="text-left" style={{ width: "100%" }}>Número</Form.Label>
                                <Form.Control
                                    value={numeroCasa}
                                    onChange={e=>setNumeroCasa(e.target.value)}
                                    />
                                </div>
                            </Col>

                            <Col sm={4}>
                                <div className="txtBairro" >
                                <Form.Label className="text-left" style={{ width: "100%" }}>Bairro</Form.Label>
                                <Form.Control
                                    value={bairro}
                                    onChange={e=>setBairro(e.target.value)}
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
                                    onChange={e=>setCidade(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col sm={2}>
                                <div className="txtUF" >
                                <Form.Label className="text-left" style={{ width: "100%" }}>UF</Form.Label>
                                <Form.Control
                                    value={uf}
                                    onChange={e=>setUF(e.target.value)}
                                    />
                                </div>
                            </Col>                                
                            <Col sm={6}>
                                <div className="txtComplemento" >
                                <Form.Label className="text-left" style={{ width: "100%" }}>Complemento</Form.Label>
                                <Form.Control
                                    value={complemento}
                                    onChange={e=>setComplemento(e.target.value)}
                                    />
                                </div>
                            </Col>
                        </Row>
                         <Row>
                            <Col sm={2}>
                                 <div className="txtDataNascimento" >
                                     <Form.Label className="text-left" style={{ width: "100%" }}>Data Nascimento</Form.Label>
                                     <Form.Control type='text' maxLength="10"
                                     value={dataNascimento}
                                     onChange={e=>setDataNascimento(dateMask(e.target.value))}
                                     />
                                 </div>
                             </Col>
                             <Col sm={2}>
                                 <div className="txtIdade" >
                                     <Form.Label className="text-left" style={{ width: "100%" }}>Idade</Form.Label>
                                     <Form.Control type='text'  maxLength="2"
                                     value={idade}
                                     onChange={e=>setIdade(e.target.value)}
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
                                    <Button variant="primary" size="lg" onClick={e=>handleNovo()}>Novo</Button>{' '}
                                </Col>
                                <Col>
                                    <Button variant="primary" size="lg" onClick={e=>handleSalvar()}>Salvar</Button>{' '}
                                </Col>
                                <Col>
                                    <Button variant="primary" size="lg" onClick={e=>setShowPesquisa(true)}>Pesquisar</Button>{' '}
                                    <ModalPesquisa titulo={"Pesquisa de Clientes"}
                                    texto={"Digite o nome do cliente"}
                                    show={showPesquisa}
                                    nome={nomePesquisa}
                                    changeNome={setNomePesquisa}
                                    close={setShowPesquisa}
                                    pesquisar={handlePesquisa}
                                    />
                                </Col>
                            </Row>
                        </Container>    
                    </div>

                </div>
            </div>
        </div>
    ) 
}
export default Clientes;