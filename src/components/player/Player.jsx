import { useContext, useState } from "react";
import { Dialog } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import ReactPlayer from "react-player/lazy";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import ClearIcon from "@material-ui/icons/Clear";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PlayerContext from "../../contex/Player";
import "./player.css";

const Player = () => {
  const [time, setTime] = useState(90);
  const [playing, setPlaying] = useState(true);
  const [indexMusic, setIndexMusic] = useState(0);
  const [playerContext, setPlayerContext] = useContext(PlayerContext);

  const timeController = e => {
    const played = e.played * 100;

    if (played > 99.5) {
      if (indexMusic + 1 >= playerContext.arrayUrl.length) {
        setIndexMusic(0);
      } else {
        setIndexMusic(indexMusic + 1);
      }
    }

    setTime(played);
  };

  const nextMusic = () => {
    console.log("indexMusic", indexMusic);
    console.log("playerContext.arrayUrl.length", playerContext.arrayUrl.length);
    if (indexMusic + 1 >= playerContext.arrayUrl.length) {
      setIndexMusic(0);
    } else {
      setIndexMusic(indexMusic + 1);
    }
  };

  const backMusic = () => {
    if (indexMusic > 0) {
      setIndexMusic(indexMusic - 1);
    }
  };

  const closeModal = () => {
    const copyContex = { ...playerContext };
    copyContex.openModal = false;
    setPlayerContext(copyContex);
  };

  const PrettoSlider = withStyles({
    root: {
      color: "#8257e6 !important",
      height: "8px !important",
    },
    thumb: {
      height: "18px !important",
      width: "18px !important",
      backgroundColor: "#fff !important",
      border: "2px solid currentColor !important",
      marginTop: "-5px !important",
      marginLeft: "-12px !important",
      "&:focus, &:hover, &$active": {
        boxShadow: "inherit",
      },
    },
    active: {},
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

  return (
    <Dialog open={playerContext.openModal} disableBackdropClick={true}>
      <div className="container-player">
        <div className="container-close">
          <ClearIcon className="button-close" onClick={closeModal} />
        </div>

        <div className="container-vol">
          <h3>{playerContext.title ? playerContext.title : ""}</h3>

          <ButtonGroup disableElevation variant="contained">
            <Button
              className="button-vol"
              onClick={backMusic}
              disabled={!indexMusic}
            >
              {"<"}
            </Button>
            <Button className="button-vol" onClick={() => setPlaying(!playing)}>
              {playing ? <PauseIcon /> : <PlayArrowIcon />}
            </Button>
            <Button className="button-vol" onClick={nextMusic}>
              {">"}
            </Button>
          </ButtonGroup>
        </div>

        <ReactPlayer
          className="react-player"
          url={playerContext.arrayUrl ? playerContext.arrayUrl[indexMusic] : ""}
          width="100%"
          height="100%"
          config={{
            youtube: {
              playerVars: { showinfo: 1 },
            },
          }}
          playing={playing}
          onProgress={timeController}
          volume={0.1}
        />

        <PrettoSlider
          aria-label="pretto slider"
          defaultValue={time}
          onChange={e => setTime(e.target.ariaValueNow)}
          disabled
        />
      </div>
    </Dialog>
  );
};
export default Player;
