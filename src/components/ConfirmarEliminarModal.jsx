import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/superadmin.css";

const ConfirmarEliminarModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>¿Estás seguro?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Esta acción eliminará al usuario permanentemente.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button className="btn btn-eliminar" onClick={onConfirm}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmarEliminarModal;
