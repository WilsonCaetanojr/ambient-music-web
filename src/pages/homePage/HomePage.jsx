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
      description: "Lofi beats instrumentais",
      img:
        "https://routenote.com/blog/wp-content/uploads/2019/09/pacific-cruisin-1280x720.jpg",
      arrayUrl: [
        "https://youtu.be/HJI6zufwXt0",
        "https://youtu.be/a2XV6JvAa8Q",
        "https://youtu.be/EZMKOO2oInQ",
        "https://youtu.be/J-d05RnxhlE",
      ],
    },
    {
      title: "Rapper Roddy Ricch",
      description: "Rapper e compositor norte-americano",
      img:
        "https://a10.gaanacdn.com/images/artists/16/1592716/crop_480x480_1592716.jpg",
      arrayUrl: [
        "https://youtu.be/CJOZc02VwJM",
        "https://youtu.be/yYliDCjxBaI",
        "https://youtu.be/jd-VdQNRUHs",
        "https://youtu.be/FctI8l2KKw8",
      ],
    },
    {
      title: "Barões da pisadinha",
      description: "Banda musical brasileira de forró eletrônico e tecnobrega",
      img:
        "https://pbs.twimg.com/profile_images/1353705250570596361/kbfgEyvF.jpg",
      arrayUrl: [
        "https://youtu.be/kNdIA-L8E3c",
        "https://youtu.be/TCLGN6m6AMI",
        "https://youtu.be/saViw05xftI",
        "https://youtu.be/HF83nwsVmwY",
      ],
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
            a =>
              a.title.toLowerCase().indexOf(speechToText.toLowerCase()) !== -1
          );

          if (album) {
            notify(album.title, true, "info");

            let obj = { openModal: true };
            Object.assign(obj, album);
            setPlayerContext(obj);
          } else {
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
