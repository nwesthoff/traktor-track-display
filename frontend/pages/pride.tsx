import Layout from "../components/Layout";
import { socket } from "../services/socket";
import { DeckInfo } from "../types";
import { useState, useEffect } from "react";
import Ticker from "../components/Ticker";
import CurrentTrack from "../components/CurrentTrack";

const IndexPage = () => {
  const [history, setHistory] = useState<DeckInfo[]>([]);

  useEffect(() => {
    socket.on("deck", updateDeck);
    return () => {
      socket.close();
    };
  }, [socket]);

  function updateDeck(msg: DeckInfo) {
    if (msg.filePath) {
      setHistory((prevHistory) => {
        return [...prevHistory, msg];
      });
    }
    //  else {
    //   setHistory((prevHistory) => {
    //     const index = prevHistory.findIndex(
    //       (needle) => needle.deck === msg.deck
    //     );
    //     prevHistory[index] = { ...prevHistory[index], ...msg };
    //     return prevHistory;
    //   });
    // }
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
            <CurrentTrack currentTrack={history?.[history.length - 1]} />
          </div>
          <Ticker history={history} />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
