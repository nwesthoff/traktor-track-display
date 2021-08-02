import React, { ReactElement } from "react";
import { DeckInfo } from "../types";

interface Props {
  history: DeckInfo[];
}

export default function Ticker({ history }: Props): ReactElement {
  return (
    <div
      style={{
        background: "rgba(0,0,0,0.85)",
        width: "100%",
      }}
    >
      {history?.length > 1 && (
        <div
          style={{
            padding: ".8rem 0",
            paddingLeft: "5%",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              display: "flex",
              flexBasis: 300,
              overflow: "hidden",
              gap: "5.6rem",
            }}
          >
            <h3>Previous: </h3>
            {history
              .slice(0, history.length - 1)
              .reverse()
              .map((track) => (
                <h3
                  style={{ opacity: 0.8 }}
                  key={track.artist + "-" + track.title}
                >
                  {track.title} - {track.artist}
                </h3>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
