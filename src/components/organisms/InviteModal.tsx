import React, { useState } from "react";
import { Button, Alert, Modal } from "react-bootstrap";
import { Margin } from "../atoms/Margin";

export function InviteModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        招待する
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>招待する</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          プレイヤーにURLを共有してください。
          <Margin height={10} />
          <Alert variant="secondary">{window.location.href}</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            閉じる
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
