import React from "react";

const PlayerContext = React.createContext({
  player: {},
  setPlayer: () => {},
});

export default PlayerContext;
