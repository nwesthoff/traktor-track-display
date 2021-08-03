import Layout from "../components/Layout";
import { socket } from "../services/socket";
import { ChannelInfo, DeckInfo } from "../types";
import { useState, useEffect } from "react";
import Ticker from "../components/Ticker";
import CurrentTrack from "../components/CurrentTrack";

const deckChannelMap = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
};

const IndexPage = () => {
  const [history, setHistory] = useState<DeckInfo[]>([]);
  const [playedHistory, setPlayedHistory] = useState<DeckInfo[]>([]);

  useEffect(() => {
    socket.on("deck", updateDeck);

    return () => {
      socket.off("deck");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("mix", updatePlayState);

    return () => {
      socket.off("mix");
    };
  }, [socket, history]);

  function updateDeck(msg: DeckInfo) {
    if (msg.filePath) {
      setHistory((prevHistory) => {
        return [...prevHistory, msg];
      });
    }
  }

  function updatePlayState(msg: ChannelInfo) {
    const deck = deckChannelMap[msg.channel];

    if (msg.isOnAir) {
      const lastDeckTrack = history
        .reverse()
        .find((track) => track.deck === deck);

      if (lastDeckTrack) {
        setPlayedHistory((prevPlayHistory) => {
          if (
            prevPlayHistory?.length > 0 &&
            prevPlayHistory.find((track) => track.title === lastDeckTrack.title)
          ) {
            return prevPlayHistory;
          } else {
            return [...prevPlayHistory, lastDeckTrack];
          }
        });
      }
    }
  }

  return (
    <Layout title={"Playing: " + history?.[history.length - 1]?.title}>
      <div
        style={{
          height: "100vh",
          width: "100%",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "0 5%",
              width: "100%",
              background:
                "linear-gradient(to top, rgba(0,0,0,.8), rgba(0,0,0,0))",
            }}
          >
            <CurrentTrack
              currentTrack={playedHistory?.[playedHistory.length - 1]}
            />
          </div>
          <Ticker history={playedHistory} />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
