import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Player from "../player/Player";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "./cardMusic.css";

export default ({ albums }) => {
  const { push } = useHistory();
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
                    src={iten.img || "./images/default.png"}
                    alt={`logo-${index}`}
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

          <div className="card">
            <div className="description">
              <AddCircleOutlineIcon
                className="icon-add-card"
                onClick={() => push("newAlbum")}
              />

              <div className="description-card"></div>
            </div>
            <ul className="sci">
              <li>
                <h3 className="new-album-text">NOVO ÁLBUM</h3>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
