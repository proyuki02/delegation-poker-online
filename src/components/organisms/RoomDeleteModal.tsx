import React, { useContext, useState } from "react";
import { Button, Alert, Modal } from "react-bootstrap";
import { RoomContext } from "../../contexts/room";
import { Margin } from "../atoms/Margin";

export function RoomDeleteModal() {
  const room = useContext(RoomContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="light" onClick={handleShow} style={{ marginLeft: 10 }}>
        ルームを削除
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>ルームを削除</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Margin height={10} />
          <Alert variant="danger">
            このルームを削除します。データを復元することはできません。よろしいですか？
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              room.deleteRoom();
              handleClose();
            }}
          >
            削除
          </Button>
          <Button variant="link" onClick={handleClose}>
            閉じる
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
