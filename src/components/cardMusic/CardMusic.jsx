import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { useState } from "react";
import Player from "../player/Player";
import "./cardMusic.css";

export default ({ albums }) => {
  const [openPlayer, setOpenPlayer] = useState(false);
  const [albumSelect, setAlbumSelect] = useState({});

  const handlePlay = iten => {
    setOpenPlayer(true);
    setAlbumSelect(iten);
  };

  return (
    <>
      {openPlayer && (
        <Player
          albumSelect={albumSelect}
          setOpenModal={setOpenPlayer}
          openModal={openPlayer}
        />
      )}
      <section>
        <div className="container">
          {albums.map((iten, index) => (
            <div className="card" key={index}>
              <div className="description">
                <div className="img">
                  <img
                    src={iten.img || "./default.png"}
                    alt={`logo-${index}`}
                    style={{ width: 132 }}
                  />
                </div>
                <div className="description-card">
                  <h3>
                    {iten.title}
                    <br />
                    <span>{iten.description}</span>
                  </h3>
                </div>
              </div>

              <ul className="sci">
                <li>
                  <PlayCircleOutlineIcon
                    className="icon-play"
                    onClick={() => handlePlay(iten)}
                  />
                </li>
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
