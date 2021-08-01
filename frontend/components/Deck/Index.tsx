import React, { ReactElement, useEffect, useState } from "react";
import { ChannelInfo, DeckId, DeckInfo } from "../../types";
import Styles from "./styles.module.css";
import { HiPlay, HiPause } from "react-icons/hi";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

interface Props {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  deckId: DeckId;
}

const deckChannelMap = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
};

export default function Deck({ socket, deckId }: Props): ReactElement {
  const [deck, setDeck] = useState<DeckInfo>(null);
  const [channel, setChannel] = useState<ChannelInfo>(null);

  useEffect(() => {
    socket.on("deck", updateDeck);
    socket.on("mix", updateChannel);
  }, [socket]);

  function updateDeck(msg: DeckInfo) {
    if (msg.deck === deckId) {
      setDeck((prevA) => {
        return { ...prevA, ...msg };
      });
    }
  }

  function updateChannel(msg: ChannelInfo) {
    if (parseInt(msg.channel) === deckChannelMap[deckId]) {
      console.log(msg);
      setChannel((prevState) => {
        return { ...prevState, ...msg };
      });
    }
  }

  return (
    <div className={Styles.deck}>
      {deck && deck.isPlaying && (
        <>
          <h2>Deck {deck.deck}</h2>
          {channel?.isOnAir ? <HiPlay size={48} /> : <HiPause size={48} />}
          <h3>{deck.artist}</h3>
          <h3>{deck.title}</h3>
        </>
      )}
    </div>
  );
}
