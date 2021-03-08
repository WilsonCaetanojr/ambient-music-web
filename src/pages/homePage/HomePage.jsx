import { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import MicNoneIcon from "@material-ui/icons/MicNone";
import Tooltip from "@material-ui/core/Tooltip";
import Navbar from "../../components/navbar/Navbar";
import CardMusic from "../../components/cardMusic/CardMusic";
import Loading from "../../components/loading/Loading";
import notify from "../../utils/notify";
import "./homePage.css";

const HomePage = () => {
  const [albums, setAlbums] = useState([
    { title: "Epic", description: "Example music album" },
  ]);
  const [loading, setLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [textModal, setTextModal] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 3000);
  }, []);

  const handleRecord = () => {
    if (isRecording === true) return;

    setIsRecording(true);
    setOpenModal(true);

    window.SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    var recognition = new window.SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = true;
    recognition.onresult = event => {
      let speechToText = event.results[event.resultIndex][0].transcript;

      if (speechToText) {
        speechToText = speechToText[0].toUpperCase() + speechToText.substr(1);
        setTextModal(speechToText.split(" "));
        notify(speechToText);
      }

      setTimeout(() => {
        setIsRecording(false);
        recognition.stop();
      }, 1000);
    };
    recognition.start();
  };

  return (
    <>
      <Navbar />
      <div className="container-home">
        <Loading loading={loading} />
        <CardMusic albums={albums} />

        <Tooltip title="Diga qual álbum deseja ouvir.">
          <Fab className="float-action" onClick={handleRecord}>
            <MicNoneIcon style={{ width: 35, height: 35 }} />
          </Fab>
        </Tooltip>
      </div>
    </>
  );
};

export default HomePage;
