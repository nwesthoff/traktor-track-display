import { io } from "socket.io-client";

export const socket = io(`wss://${process.env.NEXT_PUBLIC_SOCKET_ENDPOINT}`, {
  reconnectionDelayMax: 10000,
});
