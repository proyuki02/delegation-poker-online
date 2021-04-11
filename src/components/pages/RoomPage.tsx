import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { RoomContext } from "../../contexts/room";
import { DelegationBoard } from "../organisms/DelegationBoard";
import { Help } from "../organisms/Help";
import { InviteModal } from "../organisms/InviteModal";
import { Margin } from "../atoms/Margin";
import { PlayerList } from "../organisms/PlayerList";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "./NotFoundPage";
import LoadingOverlay from "react-loading-overlay";
import { VoteModal } from "../organisms/VoteModal";
import { ReportModal } from "../organisms/ReportModal";
import { People, ClipboardCheck } from "react-bootstrap-icons";
import { RoomDeleteModal } from "../organisms/RoomDeleteModal";

export function RoomPage() {
  const room = useContext(RoomContext);
  const { roomId } = useParams<{ roomId: string }>();

  useEffect(() => {
    room.initRoom(roomId);
    return () => {
      room.initRoom("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  if (room.roomExist === "false") {
    return <NotFoundPage />;
  }

  return (
    <LoadingOverlay
      active={room.roomExist !== "true"}
      spinner
      text="Now Loading..."
    >
      <Container fluid>
        <Margin height={20} />
        <div>
          <h4>
            <People />
            <span style={{ marginLeft: 8 }}>Player</span>
          </h4>
          <PlayerList />
          <InviteModal />
          <VoteModal />
        </div>
        <Margin height={80} />
        <div>
          <h4>
            <ClipboardCheck />
            <span style={{ marginLeft: 8 }}>Delegation Board</span>
          </h4>
          <DelegationBoard />
          <ReportModal />
          <RoomDeleteModal />
        </div>
        <Margin height={80} />
        <Help />
      </Container>
    </LoadingOverlay>
  );
}
