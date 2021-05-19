import React from "react";
import { ToastContainer } from "react-toastify";
import Routes from "./routes";
import { PlayerContextProvider } from "./context/PlayerContext";
import { UserContextProvider } from "./context/UserContext";
import "./styles/global.css";
import Player from "./components/player/Player";
import { api } from "./services/api";

function App() {
  api.setHeaders();

  return (
    <React.Fragment>
      <UserContextProvider>
        <PlayerContextProvider>
          <Routes />
          <Player />
        </PlayerContextProvider>
      </UserContextProvider>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
