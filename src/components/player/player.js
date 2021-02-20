import { useState } from "react";
import { Dialog } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import ReactPlayer from "react-player/lazy";

const ModalPlayer = ({ setOpenModal, openModal }) => {
  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [time, setTime] = useState(0);

  const teste = e => {
    const played = e.played * 100;
    // if(played === 99){
    //   next()
    // }
    setTime(played);
  };

  const PrettoSlider = withStyles({
    root: {
      color: "#8257e6",
      height: 8
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      marginTop: -8,
      marginLeft: -12,
      "&:focus, &:hover, &$active": {
        boxShadow: "inherit"
      }
    },
    active: {},
    valueLabel: {
      left: "calc(-50% + 4px)"
    },
    track: {
      height: 8,
      borderRadius: 4
    },
    rail: {
      height: 8,
      borderRadius: 4
    }
  })(Slider);

  return (
    <Dialog open={openModal} disableBackdropClick={true}>
      <div style={{ width: "90%", height: "auto", padding: 10 }}>
        <button style={{ margin: 10 }} onClick={() => setOpenModal(false)}>
          SAIR
        </button>
        <button style={{ margin: 10 }} onClick={() => setPlay(!play)}>
          {play ? "STOP" : "PLAY"}
        </button>
        <button style={{ margin: 10 }} onClick={() => setVolume(volume + 0.1)}>
          +
        </button>
        <button style={{ margin: 10 }} onClick={() => setVolume(volume - 0.1)}>
          -
        </button>
        <ReactPlayer
          className="react-player"
          url="https://youtu.be/bkG-Ucl36zA"
          width="100%"
          height="100%"
          config={{
            youtube: {
              playerVars: { showinfo: 1 }
            },
            facebook: {
              appId: "12345"
            }
          }}
          volume={volume}
          playing={play}
          onProgress={teste}
        />

        <PrettoSlider
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          defaultValue={time}
        />
      </div>
    </Dialog>
  );
};
export default ModalPlayer;
