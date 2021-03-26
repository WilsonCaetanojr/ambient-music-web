import React, { createContext, useState } from "react";

const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const [player, setPlayer] = useState({
    openModal: false,
    title: "",
    arrayUrl: [],
  });

  return (
    <PlayerContext.Provider
      value={{ playerContext: player, setPlayerContext: setPlayer }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContextProvider, PlayerContext };
