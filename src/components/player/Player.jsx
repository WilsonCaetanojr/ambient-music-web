import { useState } from "react";
import { Dialog } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import ReactPlayer from "react-player/lazy";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import ClearIcon from "@material-ui/icons/Clear";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import "./player.css";

const Player = ({ setOpenModal, openModal, albumSelect }) => {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(true);

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
      <div className="container-player">
        <div className="container-close">
          <ClearIcon
            className="button-close"
            onClick={() => setOpenModal(false)}
          />
        </div>

        <div className="container-vol">
          <h3>{albumSelect ? albumSelect.title : ""}</h3>

          <ButtonGroup disableElevation variant="contained">
            <Button className="button-vol">{"<"}</Button>
            <Button className="button-vol" onClick={() => setPlaying(!playing)}>
              {playing ? <PauseIcon /> : <PlayArrowIcon />}
            </Button>
            <Button className="button-vol">{">"}</Button>
          </ButtonGroup>
        </div>

        <ReactPlayer
          className="react-player"
          url="https://youtu.be/bkG-Ucl36zA"
          width="100%"
          height="100%"
          config={{
            youtube: {
              playerVars: { showinfo: 1 }
            }
          }}
          playing={playing}
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
export default Player;