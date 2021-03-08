import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import PlayerContext from "./contex/Player";
import "./styles/global.css";
import { useState } from "react";
import Player from "./components/player/Player";

function App() {
  const [player, setPlayer] = useState({ openModal: false });

  return (
    <PlayerContext.Provider value={[player, setPlayer]}>
      <Routes />
      <ToastContainer />
      <Player />
    </PlayerContext.Provider>
  );
}

export default App;
