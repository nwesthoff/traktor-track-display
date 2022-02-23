import React, { ReactElement } from "react";
import { DeckInfo } from "../../types";
import Rainbow from "../Rainbow";
import Styles from "./styles.module.scss";
import { CSSTransition, SwitchTransition } from "react-transition-group";

interface Props {
  currentTrack: DeckInfo;
}

export default function CurrentTrack({ currentTrack }: Props): ReactElement {
  if (!currentTrack) {
    return null;
  }
  return (
    <>
      <div className={Styles.trackTitle}>
        <SwitchTransition mode="out-in">
          <CSSTransition<undefined>
            key={currentTrack.title + currentTrack.artist}
            addEndListener={(node: HTMLElement, done: () => void) => {
              node.addEventListener("transitionend", done, false);
            }}
            className="fade"
          >
            <h1 className="fade">{currentTrack.title}</h1>
          </CSSTransition>
        </SwitchTransition>
      </div>
      <div className={Styles.artistName}>
        <SwitchTransition mode="out-in">
          <CSSTransition<undefined>
            key={currentTrack.title + currentTrack.artist}
            addEndListener={(node: HTMLElement, done: () => void) => {
              node.addEventListener("transitionend", done, false);
            }}
            className="fade"
          >
            <h2 className="fade">{currentTrack.artist}</h2>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  );
}
