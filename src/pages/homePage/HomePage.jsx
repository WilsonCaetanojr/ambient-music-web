import { useState, useEffect, useContext } from "react";
import Fab from "@material-ui/core/Fab";
import MicNoneIcon from "@material-ui/icons/MicNone";
import Tooltip from "@material-ui/core/Tooltip";
import Navbar from "../../components/navbar/Navbar";
import CardMusic from "../../components/cardMusic/CardMusic";
import Loading from "../../components/loading/Loading";
import notify from "../../utils/notify";
import { PlayerContext } from "../../context/PlayerContext";
import "./homePage.css";
import api from "../../services/api";

// Configuration recognition
window.SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;
const recognition = new window.SpeechRecognition();
recognition.continuous = true;

const HomePage = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { setPlayerContext } = useContext(PlayerContext);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/albums");

        setAlbums(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleRecord = () => {
    if (isRecording === true) return;

    try {
      setIsRecording(true);

      window.SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      var recognition = new window.SpeechRecognition();
      recognition.lang = "pt-BR";
      recognition.continuous = true;
      recognition.onresult = event => {
        let speechToText = event.results[event.resultIndex][0].transcript;

        if (speechToText) {
          speechToText = speechToText[0].toUpperCase() + speechToText.substr(1);

          const album = albums.find(
            a =>
              a.title
                .toLowerCase()
                .indexOf(speechToText.toLowerCase().substr(0, 4)) !== -1
          );
          if (album) {
            notify(album.title, true, "info");

            setPlayerContext(
              Object.assign({ openModal: true, playing: true, index: 0 }, album)
            );
          } else {
            console.log("Álbum não encontrado:", speechToText);
            notify("Álbum não encontrado.");
            const audioAlbumNotFound = new Audio("./audios/albumNotFound.mp3");
            audioAlbumNotFound.play();
          }
        }

        recognition.stop();
      };

      recognition.onaudioend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (err) {
      setIsRecording(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-home">
        <Loading loading={loading} />
        <CardMusic albums={albums} />

        <Tooltip title="Diga qual álbum deseja ouvir.">
          <Fab className="float-action" onClick={handleRecord}>
            {isRecording ? (
              <img src="./icons/recording.gif" className="img-recording" />
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
