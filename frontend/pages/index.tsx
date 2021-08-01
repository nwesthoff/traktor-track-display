import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { ChannelInfo, DeckInfo } from "../types";
import Deck from "../components/Deck/Index";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { socket } from "../services/socket";

const deckChannelMap = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
};

const IndexPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      {socket && (
        <>
          <Deck socket={socket} deckId="A" />
          <Deck socket={socket} deckId="B" />
          <Deck socket={socket} deckId="C" />
          <Deck socket={socket} deckId="D" />
        </>
      )}
    </Layout>
  );
};

export default IndexPage;
