import { Form, Modal, Button } from 'react-bootstrap';

const ModalPesquisa = (props) => {
    if (!props.show) {
        return null
    }
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{props.titulo}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            value={props.nome}
            onChange={e => props.changeNome(e.target.value)}
            />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={e => props.close(false)}>Fechar</Button>
          <Button variant="primary" onClick={e => props.pesquisar()}>Buscar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ModalPesquisa;