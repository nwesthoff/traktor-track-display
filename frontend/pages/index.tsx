import Layout from "../components/Layout";
import Deck from "../components/Deck/Index";
import { socket } from "../services/socket";

const IndexPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      {socket && (
        <>
          <Deck socket={socket} deckId="A" />
          <Deck socket={socket} deckId="B" />
          <Deck socket={socket} deckId="C" />
          <Deck socket={socket} deckId="D" />
        </>
      )}
    </Layout>
  );
};

export default IndexPage;
