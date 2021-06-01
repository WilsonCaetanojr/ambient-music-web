import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { PlayerContext } from "../../context/PlayerContext";
import Loading from "../loading/Loading";
import { api } from "../../services/api";
import { notify } from "../../utils/notify";
import "./cardMusic.css";

const CardMusic = ({ albums, setAlbums }) => {
  const { push } = useHistory();
  const { setPlayerContext } = useContext(PlayerContext);
  const [loading, setLoading] = useState(false);

  const handlePlay = (item) => {
    setPlayerContext(
      Object.assign({ openModal: true, playing: true, index: 0 }, item)
    );
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar o tema?")) {
      try {
        setLoading(true);

        await api.delete(`/albums/${id}`);
        setAlbums(albums.filter((item) => item.Id !== id));
        notify("Tema removido com sucesso", true, "info");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("handleSubmit EditAlbum ERROR", error);
      }
    }
  };

  return (
    <>
      <Loading loading={loading} />
      <section>
        <div className="container">
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
                <h3 className="new-album-text">NOVO TEMA</h3>
              </li>
            </ul>
          </div>

          {albums.map((item, index) => (
            <div className="card" key={index}>
              <div className="description">
                <div className="img">
                  <img
                    src={item.Image || "./images/earphone.png"}
                    alt={`logo-${index}`}
                  />
                </div>
                <div className="description-card">
                  <h3>
                    {item.Name}
                    <br />
                    <span>{item.Description}</span>
                  </h3>
                </div>
              </div>

              <ul className="sci">
                <li>
                  <PlayCircleOutlineIcon
                    className="icon-play"
                    onClick={() => handlePlay(item)}
                  />
                </li>
                <li>
                  <EditOutlinedIcon
                    className="icon-card"
                    onClick={() => push("editAlbum", { Id: item.Id })}
                  />
                </li>
                <li>
                  <DeleteOutlineIcon
                    className="icon-card"
                    onClick={() => handleDelete(item.Id)}
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

export default CardMusic;
