import React, { useContext } from "react";
import { Button, Badge } from "react-bootstrap";
import { RoomContext } from "../../contexts/room";

export function PlayerList() {
  const room = useContext(RoomContext);
  const playing = room.playing();

  return (
    <>
      <div style={{ fontSize: 20, marginBottom: 10 }}>
        {room.players.map((player) => (
          <Badge pill variant="info" style={{ marginRight: 4 }}>
            {player.name}
          </Badge>
        ))}
      </div>
      <Button
        variant={playing ? "light" : "primary"}
        onClick={() => (playing ? room.leave() : room.join())}
      >
        {playing ? "脱退する" : "参加する"}
      </Button>
    </>
  );
}
