import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FirebaseContext } from "./firebase";

export interface IPlayer {
  id: string;
  name: string;
}

export interface ITopic {
  id: string;
  topic: string;
  level: string;
  state: "normal" | "voting";
}

export interface IVote {
  id: string;
  topicId: string;
  playerId: string;
  name: string;
  level: string;
  created: number;
}

interface IRoomContext {
  players: Array<IPlayer>;
  playing: () => boolean;
  join: () => Promise<void>;
  leave: () => Promise<void>;
  topics: Array<ITopic>;
  addTopic: (topic: string) => Promise<void>;
  removeTopic: (topicId: string) => Promise<void>;
  roomExist: "unknown" | "true" | "false";
  initRoom: (roomId: string) => Promise<void>;
  createRoom: (roomId: string) => Promise<void>;
  updateTopicLevel: (topicId: string, level: string) => Promise<void>;
  voting: ITopic;
  startVote: (topicId: string) => Promise<void>;
  stopVote: () => Promise<void>;
  votes: Array<IVote>;
  vote: (level: string) => Promise<void>;
  myVote: () => string;
  deleteRoom: () => Promise<void>;
}
const RoomContext = createContext({} as IRoomContext);

function RoomProvider(props: { children: React.ReactNode }) {
  const fb = useContext(FirebaseContext);
  const [roomId, setRoomId] = useState("");
  const [topics, setTopics] = useState([] as Array<ITopic>);
  const [players, setPlayers] = useState([] as Array<IPlayer>);
  const [votes, setVotes] = useState([] as Array<IVote>);
  const [voting, setVoting] = useState({} as ITopic);
  const [roomExist, setRoomExist] = useState(
    "unknown" as "unknown" | "true" | "false"
  );

  const getRoomRef = () => fb.db.collection("rooms").doc(roomId);

  const initRoom = async (roomId: string): Promise<void> => {
    setRoomId(roomId);

    // clear
    if (!roomId) {
      setRoomExist("unknown");
      return;
    }

    // room not exist
    const doc = fb.db.collection("rooms").doc(roomId);
    if ((await doc.get()).exists === false) {
      setRoomExist("false");
      return;
    }

    // room exist
    setRoomExist("true");

    // room handler
    doc.onSnapshot((room) => {
      // delete room handler
      if (room.data() === undefined) {
        setTimeout(() => (window.location.href = "/"), 500);
      }
    });

    // players handler
    doc.collection("players").onSnapshot((players) => {
      const playersList = players.docs
        .map((x) => {
          const data = x.data();
          return {
            id: x.id,
            name: data.name,
            created: data.created,
          };
        })
        .sort((a, b) => a.created - b.created);
      setPlayers(playersList);
    });

    // topics handler
    doc.collection("topics").onSnapshot((topics) => {
      let votingTopic = {} as ITopic;
      const topicList = topics.docs
        .map((x) => {
          const data = x.data();
          const topic = {
            id: x.id,
            topic: data.topic,
            level: data.level,
            state: data.state,
            created: data.created,
          };
          if (topic.state === "voting") {
            votingTopic = topic;
          }
          return topic;
        })
        .sort((a, b) => a.created - b.created);
      setVoting(votingTopic);
      setTopics(topicList);
      console.log("update topics", { votingTopic, topicList });
    });

    // votes handler
    doc.collection("votes").onSnapshot(async (votes) => {
      const voteList = votes.docs.map((x) => {
        const data = x.data();
        const vote = {
          id: x.id,
          topicId: data.topicId,
          playerId: data.playerId,
          name: data.name,
          level: data.level,
          created: data.created,
        };
        return vote;
      });
      setVotes(voteList);
      console.log("update votes", { voteList });
    });
  };

  const createRoom = async (roomId: string): Promise<void> => {
    const roomRef = fb.db.collection("rooms").doc(roomId);
    if ((await roomRef.get()).exists === false) {
      await roomRef.set({
        created: new Date().getTime(),
      });
    }
  };

  const join = async () => {
    const roomRef = getRoomRef();
    const playerId = fb.user?.uid;
    const name = fb.user?.displayName;
    await roomRef
      .collection("players")
      .doc(playerId)
      .set({ name, created: new Date().getTime() });
  };

  const leave = async () => {
    const roomRef = getRoomRef();
    const playerId = fb.user?.uid;
    await roomRef.collection("players").doc(playerId).delete();
  };

  const addTopic = async (topic: string) => {
    const roomRef = getRoomRef();
    const topicId = uuidv4();
    await roomRef.collection("topics").doc(topicId).set({
      topic,
      level: "",
      state: "normal",
      created: new Date().getTime(),
    });
  };

  const startVote = async (topicId: string) => {
    const roomRef = getRoomRef();
    const batch = fb.db.batch();
    votes
      .filter((v) => v.topicId === topicId)
      .map((v) => batch.delete(roomRef.collection("votes").doc(v.id)));
    await batch.commit();

    await roomRef.collection("topics").doc(topicId).update({ state: "voting" });
  };

  const stopVote = async () => {
    const roomRef = getRoomRef();
    const topicId = voting.id;
    if (topicId) {
      await roomRef
        .collection("topics")
        .doc(topicId)
        .update({ state: "normal" });
      const batch = fb.db.batch();
      votes
        .filter((v) => v.topicId === topicId)
        .map((v) => batch.delete(roomRef.collection("votes").doc(v.id)));
      await batch.commit();
    }
  };

  const vote = async (level: string) => {
    const roomRef = getRoomRef();
    const user = players.find((p) => p.id === fb?.user?.uid);
    if (!user) return;
    await roomRef
      .collection("votes")
      .doc(voting.id + "-" + user.id)
      .set({
        topicId: voting.id,
        playerId: user.id,
        name: user.name,
        level,
        created: new Date().getTime(),
      });

    // vote finish
    if (voting.id) {
      const votedPlayers = votes
        .filter((v) => v.topicId === voting.id)
        .map((v) => v.playerId);
      const votingPlayers = players.filter((p) => !votedPlayers.includes(p.id));
      if (
        votingPlayers.length === 0 ||
        (votingPlayers.length === 1 && votingPlayers[0].id === fb?.user?.uid)
      ) {
        await roomRef
          .collection("topics")
          .doc(voting.id)
          .update({ state: "normal" });
      }
    }
  };

  const myVote = () => {
    const my = votes.find(
      (v) => v.playerId === fb?.user?.uid && v.topicId === voting.id
    );
    return my?.level || "";
  };

  const updateTopicLevel = async (topicId: string, level: string) => {
    const roomRef = getRoomRef();
    await roomRef.collection("topics").doc(topicId).update({ level });
  };

  const removeTopic = async (topicId: string) => {
    const roomRef = getRoomRef();
    await roomRef.collection("topics").doc(topicId).delete();
  };

  const playing = () => {
    return players.some((p) => p.id === fb?.user?.uid);
  };

  const deleteRoom = async () => {
    const roomRef = getRoomRef();
    const batch = fb.db.batch();
    players.map((v) => batch.delete(roomRef.collection("players").doc(v.id)));
    topics.map((v) => batch.delete(roomRef.collection("topics").doc(v.id)));
    votes.map((v) => batch.delete(roomRef.collection("votes").doc(v.id)));
    batch.delete(roomRef);
    await batch.commit();
  };

  return (
    <RoomContext.Provider
      value={{
        createRoom,
        initRoom,
        roomExist,
        players,
        playing,
        join,
        leave,
        topics,
        addTopic,
        removeTopic,
        updateTopicLevel,
        voting,
        startVote,
        stopVote,
        vote,
        votes,
        myVote,
        deleteRoom,
      }}
    >
      {props.children}
    </RoomContext.Provider>
  );
}

export { RoomContext, RoomProvider };
