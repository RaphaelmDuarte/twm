import { Modal, Button } from 'react-bootstrap';

const ModalAlert = (props) => {
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
          <h2>{props.texto}</h2>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={e => props.close(false)}>Ok</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ModalAlert;