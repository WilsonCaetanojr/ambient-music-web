import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import { PlayerContextProvider } from "./context/PlayerContext";
import "./styles/global.css";
import Player from "./components/player/Player";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <PlayerContextProvider>
        <Routes />
        <Player />
      </PlayerContextProvider>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
