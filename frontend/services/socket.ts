import { io } from "socket.io-client";

export const socket = io("ws://localhost:8080", {
  reconnectionDelayMax: 10000,
});
