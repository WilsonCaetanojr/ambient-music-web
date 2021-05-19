import { useState, useEffect, useContext } from "react";
import Fab from "@material-ui/core/Fab";
import MicNoneIcon from "@material-ui/icons/MicNone";
import Tooltip from "@material-ui/core/Tooltip";
import Navbar from "../../components/navbar/Navbar";
import CardMusic from "../../components/cardMusic/CardMusic";
import Loading from "../../components/loading/Loading";
import { notify } from "../../utils/notify";
import { PlayerContext } from "../../context/PlayerContext";
import "./homePage.css";
import { api } from "../../services/api";

// Configuration recognition
window.SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;
const recognition = new window.SpeechRecognition();
recognition.continuous = true;

const HomePage = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { playerContext, setPlayerContext } = useContext(PlayerContext);
  const [previousVolume, setPreviousVolume] = useState(playerContext.volume);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/albums");

        setAlbums(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleChangeIsRecording = value => {
    setIsRecording(value);
    if (value && playerContext.volume > 10) {
      setPreviousVolume(playerContext.volume);
      setPlayerContext({ volume: 10 });
    } else {
      setPlayerContext({ volume: previousVolume });
    }
  };

  const handleRecord = () => {
    if (isRecording === true) {
      recognition.stop();
      handleChangeIsRecording(false);
      return;
    }

    try {
      handleChangeIsRecording(true);

      recognition.onresult = event => {
        let speechToText = event.results[event.resultIndex][0].transcript;

        if (speechToText) {
          speechToText = speechToText[0].toUpperCase() + speechToText.substr(1);

          const album = albums.find(
            a =>
              a.Name.toLowerCase().indexOf(
                speechToText.toLowerCase().substr(0, 4)
              ) !== -1
          );
          if (album) {
            notify(album.Name, true, "info");

            setPlayerContext(
              Object.assign({ openModal: true, playing: true, index: 0 }, album)
            );
          } else {
            console.log("Álbum não encontrado:", speechToText);
            notify("Tema não encontrado.");
            const audioAlbumNotFound = new Audio("./audios/themeNotFound.mp3");
            audioAlbumNotFound.play();
          }
        }

        recognition.stop();
      };

      recognition.onaudioend = () => {
        handleChangeIsRecording(false);
      };

      recognition.start();
    } catch (err) {
      handleChangeIsRecording(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-home">
        <Loading loading={loading} />
        <CardMusic albums={albums} />

        <Tooltip title="Diga qual tema deseja ouvir.">
          <Fab className="float-action" onClick={handleRecord}>
            {isRecording ? (
              <img
                alt="recording"
                src="./icons/recording.gif"
                className="img-recording"
              />
            ) : (
              <MicNoneIcon className="float-action-icon" />
            )}
          </Fab>
        </Tooltip>
      </div>
    </>
  );
};

export default HomePage;
