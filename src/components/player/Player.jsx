import { useContext, useEffect, useRef, useState } from "react";
import { Dialog, ButtonGroup, Slider, Button, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ReactPlayer from "react-player/lazy";
import ClearIcon from "@material-ui/icons/Clear";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PlayerContext from "../../context/Player";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUp from "@material-ui/icons/VolumeUp";
import "./player.css";
import notify from "../../utils/notify";

const Player = () => {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(100);
  const [volumeMuted, setVolumeMuted] = useState(false);
  const [indexMusic, setIndexMusic] = useState(0);
  const [playerContext, setPlayerContext] = useContext(PlayerContext);
  const refVideo = useRef(null);

  const handleChangeVol = (event, newValue) => {
    setVolume(newValue);
    setVolumeMuted(newValue === 0 ? true : false);
  };

  useEffect(() => {
    setPlaying(true);
    setIndexMusic(0);
  }, [playerContext]);

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
          <div className="container-vol ">
            <Grid container spacing={2}>
              <Grid item>
                {volumeMuted ? (
                  <VolumeOffIcon onClick={() => setVolumeMuted(false)} />
                ) : (
                  <>
                    {volume <= 50 ? (
                      <VolumeDown onClick={() => setVolumeMuted(true)} />
                    ) : (
                      <VolumeUp onClick={() => setVolumeMuted(true)} />
                    )}
                  </>
                )}
              </Grid>
              <Grid item xs>
                <Slider
                  value={volume}
                  onChange={handleChangeVol}
                  aria-labelledby="continuous-slider"
                  max={100}
                  min={0}
                />
              </Grid>
            </Grid>
          </div>
        </div>

        <div className="container-actions-buttons">
          <h3>{playerContext.title ? playerContext.title : ""}</h3>

          <ButtonGroup disableElevation variant="contained">
            <Button
              className="button-action"
              onClick={backMusic}
              disabled={!indexMusic}
            >
              {"<"}
            </Button>
            <Button
              className="button-action"
              onClick={() => setPlaying(!playing)}
            >
              {playing ? <PauseIcon /> : <PlayArrowIcon />}
            </Button>
            <Button className="button-action" onClick={nextMusic}>
              {">"}
            </Button>
          </ButtonGroup>
        </div>

        <ReactPlayer
          ref={refVideo}
          className="react-player"
          url={playerContext.arrayUrl ? playerContext.arrayUrl[indexMusic] : ""}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onError={() => notify("Não foi possível reproduzir a mídia.")}
          width="100%"
          height="100%"
          controls={false}
          pip={false}
          playing={playing}
          onProgress={timeController}
          volume={volume / 100}
          muted={volumeMuted}
        />

        <Slider
          aria-label="pretto slider"
          value={
            refVideo && refVideo.current
              ? refVideo.current.getCurrentTime()
              : time
          }
          onChange={(e, value) => {
            setTime(value);
            refVideo.current.seekTo(value);
          }}
          min={0}
          max={
            refVideo && refVideo.current ? refVideo.current.getDuration() : 100
          }
        />
      </div>
    </Dialog>
  );
};
export default Player;
