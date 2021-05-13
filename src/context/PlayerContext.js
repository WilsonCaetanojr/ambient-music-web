import React, { createContext, useState } from "react";

const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const [player, setPlayer] = useState({
    openModal: false,
    play: true,
    Name: "",
    Musics: [],
    volume: 50,
    muted: false,
    index: 0,
  });

  const changePlayer = values => {
    const copy = { ...player };

    setPlayer(Object.assign(copy, values));
  };

  return (
    <PlayerContext.Provider
      value={{ playerContext: player, setPlayerContext: changePlayer }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContextProvider, PlayerContext };
