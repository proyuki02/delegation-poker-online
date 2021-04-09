import React, { useContext } from "react";
import { Button, Col, Row, Form, Modal, Badge } from "react-bootstrap";
import { IPlayer, RoomContext } from "../../contexts/room";
import { delegationLevel } from "../../define";
import { Margin } from "../atoms/Margin";

function Level(props: { d: string; alt: string }) {
  const room = useContext(RoomContext);
  const myVote = room.myVote();

  return (
    <Col style={{ textAlign: "center" }}>
      <Form.Label htmlFor={"voteSelect" + props.d}>
        <div>
          <img src={`/image/d${props.d}.png`} alt={props.alt} height={120} />
        </div>
        <div>
          <Form.Check
            type="radio"
            label=""
            name="voteSelect"
            id={"voteSelect" + props.d}
            custom
            checked={props.d === myVote}
            onClick={() => room.vote(props.d)}
          />
        </div>
      </Form.Label>
    </Col>
  );
}

function Player(props: { player: IPlayer }) {
  const room = useContext(RoomContext);

  const voting = !room.votes.find(
    (v) => v.topicId === room.voting.id && v.playerId === props.player.id
  );

  return (
    <div>
      <Badge pill variant={voting ? "success" : "secondary"}>
        {voting ? "投票中" : "投票済"}
      </Badge>
      &nbsp;{props.player.name}
    </div>
  );
}

export function VoteModal() {
  const room = useContext(RoomContext);

  return (
    <>
      <Modal
        show={room.voting.id && room.playing()}
        onHide={() => {}}
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header>
          <Modal.Title>投票受付中</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          「{room.voting.topic}」の権限レベルを選択してください。
          <Margin height={10} />
          <Row>
            {Object.keys(delegationLevel).map((key) => (
              <Level key={key} d={key} alt={delegationLevel[key]} />
            ))}
          </Row>
          <Margin height={20} />
          {room.players.map((player) => (
            <Player player={player} />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              room.stopVote();
            }}
          >
            投票を中断する
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
