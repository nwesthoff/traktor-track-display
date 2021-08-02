import express, { Request, Response } from "express";
import { Server } from "socket.io";
import cors from "cors";

const PORT = process.env.PORT || 8080;
const verbose = true;

const app = express();
app.use(cors());
app.use(express.json());

const server = app.listen(PORT, () => console.log(`Port ${PORT}`));

// socket setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: "*",
  },
});

io.on("connection", (socket) => {
  verbose && console.log("User connected");

  socket.on("deck", (data) => {
    io.sockets.emit("chat", data);
  });
});

app.post("/deckLoaded/*", (req: Request, res: Response) => {
  verbose && console.log(req.body);
  const msg = "Deck " + req.params[0].toUpperCase();
  io.sockets.emit("deck", { ...req.body, deck: req.params[0].toUpperCase() });
  return res.status(200).json(msg);
});

app.post("/updateDeck/*", (req: Request, res: Response) => {
  verbose && console.log(req.body);
  const msg = "Deck " + req.params[0].toUpperCase();
  io.sockets.emit("deck", { ...req.body, deck: req.params[0].toUpperCase() });
  return res.status(200).json(msg);
});

app.post("/updateChannel/*", (req: Request, res: Response) => {
  verbose && console.log(req.body);
  const msg = "Channel " + req.params[0].toUpperCase();
  io.sockets.emit("mix", { ...req.body, channel: req.params[0].toUpperCase() });
  return res.status(200).json(msg);
});
