import Layout from "../components/Layout";
import { socket } from "../services/socket";
import { ChannelInfo, DeckInfo } from "../types";
import { useState, useEffect } from "react";
import Ticker from "../components/Ticker";
import CurrentTrack from "../components/CurrentTrack";
import Rainbow from "../components/Rainbow";
import Logo from "../components/Logo";
import GradientLogo from "../components/GradientLogo";

const deckChannelMap = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
};

const BorrelPage = () => {
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

  const prevTrack = history?.[history.length - 1];

  return (
    <Layout
      title={
        prevTrack ? "▶️ Playing: " + prevTrack?.title : "📢 Ready to party..."
      }
    >
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
              padding: "0 5% 1.2rem",
              width: "100%",
              background:
                "linear-gradient(to top, rgba(0,0,0,.8), rgba(0,0,0,0))",
            }}
          >
            <div
              style={{
                padding: "1.2rem 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "48px",
              }}
            >
              <div>
                <CurrentTrack
                  currentTrack={playedHistory?.[playedHistory.length - 1]}
                />
              </div>

              <GradientLogo />
            </div>
          </div>
          <Ticker history={playedHistory} />
        </div>
      </div>
    </Layout>
  );
};

export default BorrelPage;
