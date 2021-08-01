export type DeckId = "A" | "B" | "C" | "D";
export type Key = "1m" | "2m";
export interface DeckInfo {
  filePath: string;
  title: string;
  artist: string;
  album: string;
  comment: string;
  comment2: string;
  label: string;
  mix: string;
  remixer: string;
  key: Key;
  keyText: Key;
  gridOffset: number;
  trackLength: number;
  elapsedTime: number;
  nextCuePos: number;
  bpm: number;
  tempo: number;
  resultingKey: Key;
  isPlaying: boolean;
  isSynced: boolean;
  isKeyLockOn: boolean;
  deck?: DeckId;
}
export interface ChannelInfo {
  channel: string;
  isOnAir: boolean;
}
