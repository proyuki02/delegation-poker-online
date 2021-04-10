import React, { useContext, useState } from "react";
import { Button, Table, Form, Badge } from "react-bootstrap";
import { ITopic, RoomContext } from "../../contexts/room";
import { delegationLevel } from "../../define";
import { TopicSampleModal } from "./TopicSampleModal";

function Th(props: { d: string; alt: string }) {
  return (
    <th style={{ textAlign: "center" }}>
      <img src={`/image/d${props.d}.png`} alt={props.alt} height={100} />
    </th>
  );
}

function Td(props: { topic: ITopic; level: string }) {
  const room = useContext(RoomContext);
  const playing = room.playing();
  const votePlayers =
    props.topic.state === "voting"
      ? [] // hidden at voting
      : room.votes
          .filter(
            (v) => v.topicId === props.topic.id && v.level === props.level
          )
          .sort((a, b) => a.created - b.created);

  return (
    <td align="center" valign="top">
      <div>
        <Form.Check
          type="radio"
          name={`radio-${props.topic.id}`}
          id={`radio-${props.topic.id}-${props.level}`}
          custom
          checked={props.topic.level === props.level}
          onClick={() => room.updateTopicLevel(props.topic.id, props.level)}
          disabled={!playing}
        />
      </div>
      <div style={{ fontSize: 14, marginTop: 4 }}>
        {votePlayers.map((v) => (
          <div>
            <Badge pill variant="info">
              {v.name}
            </Badge>
          </div>
        ))}
      </div>
    </td>
  );
}

function Buttons(props: { topic: ITopic }) {
  const room = useContext(RoomContext);

  if (!room.playing()) {
    return null;
  }

  const voting = props.topic.id === room.voting.id;
  const voted = props.topic.level !== "";

  return (
    <>
      <Button
        onClick={() =>
          voting ? room.stopVote() : room.startVote(props.topic.id)
        }
        size="sm"
        variant={voting ? "danger" : voted ? "light" : "primary"}
      >
        {voting ? "投票中断" : "投票開始"}
      </Button>
      <Button onClick={() => room.removeTopic(props.topic.id)} variant="link">
        削除
      </Button>
    </>
  );
}

function TopicInputForm() {
  const room = useContext(RoomContext);
  const [topicText, setTopicText] = useState("");

  if (!room.playing()) {
    return null;
  }

  return (
    <tr>
      <td></td>
      <td colSpan={8}>
        <Form.Control
          type="text"
          placeholder="議題を入力してください"
          value={topicText}
          onChange={(el) => setTopicText(el.target.value)}
        />
        <Button
          onClick={async () => {
            if (topicText.trim() === "") return;
            await room.addTopic(topicText);
            setTopicText("");
          }}
          style={{ marginTop: 4 }}
        >
          議題登録
        </Button>
        <TopicSampleModal />
      </td>
    </tr>
  );
}

export function DelegationBoard() {
  const room = useContext(RoomContext);

  return (
    <Table bordered>
      <thead>
        <tr style={{ backgroundColor: "#f6f6f6" }}>
          <th>#</th>
          <th style={{ minWidth: 500 }}>議題</th>
          {Object.keys(delegationLevel).map((key) => (
            <Th key={key} d={key} alt={delegationLevel[key]} />
          ))}
        </tr>
      </thead>
      <tbody>
        {room.topics.map((topic, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>
              {topic.topic}
              &nbsp;&nbsp;
              <Buttons topic={topic} />
            </td>
            {Object.keys(delegationLevel).map((key) => (
              <Td topic={topic} level={key} />
            ))}
          </tr>
        ))}
        <TopicInputForm />
      </tbody>
    </Table>
  );
}
