import { useState, useEffect, useContext } from "react";
import Fab from "@material-ui/core/Fab";
import MicNoneIcon from "@material-ui/icons/MicNone";
import Tooltip from "@material-ui/core/Tooltip";
import Navbar from "../../components/navbar/Navbar";
import CardMusic from "../../components/cardMusic/CardMusic";
import Loading from "../../components/loading/Loading";
import notify from "../../utils/notify";
import PlayerContext from "../../contex/Player";
import "./homePage.css";

// Configuration recognition
window.SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;
const recognition = new window.SpeechRecognition();
recognition.lang = "pt-BR";
recognition.continuous = true;

const HomePage = () => {
  const [albums, setAlbums] = useState([
    {
      title: "Pacific",
      description: "Example music album",
      url: "https://youtu.be/HJI6zufwXt0",
    },
    {
      title: "Sapo Louco",
      description: "Example music album",
      url: "https://youtu.be/k85mRPqvMbE",
    },
    {
      title: "Baiano",
      description: "Example music album",
      url: "https://youtu.be/kNdIA-L8E3c",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [, setPlayerContext] = useContext(PlayerContext);

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 1000);
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
            a => a.title.toLowerCase() === speechToText.toLowerCase()
          );
          notify(speechToText, true, "info");

          if (album) {
            let obj = { openModal: true };
            Object.assign(obj, album);
            setPlayerContext(obj);
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
