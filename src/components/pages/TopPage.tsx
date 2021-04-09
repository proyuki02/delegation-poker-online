import React, { useContext } from "react";
import { Button, Container } from "react-bootstrap";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { Help } from "../organisms/Help";
import { useHistory } from "react-router-dom";
import { RoomContext } from "../../contexts/room";

const Form = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function TopPage() {
  const room = useContext(RoomContext);
  const history = useHistory();

  return (
    <Container fluid>
      <Form>
        <div>
          <Button
            variant="primary"
            size="lg"
            onClick={async () => {
              const roomId = uuidv4();
              await room.createRoom(roomId);
              history.push("/" + roomId);
            }}
          >
            ルームを作成する
          </Button>
        </div>
      </Form>
      <Help />
    </Container>
  );
}
