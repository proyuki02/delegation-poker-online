import React, { useContext, useState } from "react";
import { Button, Alert, Modal } from "react-bootstrap";
import { RoomContext } from "../../contexts/room";
import { delegationLevel } from "../../define";
import { Margin } from "../atoms/Margin";

export function ReportModal() {
  const room = useContext(RoomContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Markdownで結果を表示
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Markdownで結果を表示</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Margin height={10} />
          <Alert variant="secondary">
            ## Player
            <br />
            <br />
            {room.players.map((p, idx) => (
              <div>- {p.name}</div>
            ))}
            <br />
            ## Delegation Board
            <br />
            <br />
            {room.topics.map((t, idx) => (
              <div>
                {idx + 1}. {t.topic} 【{t.level} {delegationLevel[t.level]}】
              </div>
            ))}
          </Alert>
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
