import { useContext, useRef, useState } from "react";
import { Dialog, ButtonGroup, Slider, Button, Grid } from "@material-ui/core";
import ReactPlayer from "react-player/lazy";
import ClearIcon from "@material-ui/icons/Clear";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { PlayerContext } from "../../context/PlayerContext";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUp from "@material-ui/icons/VolumeUp";
import "./player.css";
import notify from "../../utils/notify";

const Player = () => {
  const [time, setTime] = useState(0);
  const [volumeMuted, setVolumeMuted] = useState(false);
  const { playerContext, setPlayerContext } = useContext(PlayerContext);
  const refVideo = useRef(null);

  console.log(playerContext);
  const handleChangeVol = (event, value) => {
    setPlayerContext({ volume: value });
    setVolumeMuted(value === 0 ? true : false);
  };

  const timeController = e => {
    const played = e.played * 100;

    if (played > 98.5) {
      if (playerContext.index + 1 >= playerContext.Musics.length) {
        setPlayerContext({ index: 0 });
      } else {
        setPlayerContext({ index: playerContext.index + 1 });
      }
    }

    setTime(played);
  };

  const nextMusic = () => {
    if (playerContext.index + 1 >= playerContext.Musics.length) {
      setPlayerContext({ index: 0 });
    } else {
      setPlayerContext({ index: playerContext.index + 1 });
    }
  };

  const backMusic = () => {
    if (playerContext.index > 0) {
      setPlayerContext({ index: playerContext.index - 1 });
    }
  };

  const closeModal = () => {
    setPlayerContext({ openModal: false });
  };

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
                    {playerContext.volume <= 50 ? (
                      <VolumeDown onClick={() => setVolumeMuted(true)} />
                    ) : (
                      <VolumeUp onClick={() => setVolumeMuted(true)} />
                    )}
                  </>
                )}
              </Grid>
              <Grid item xs>
                <Slider
                  value={playerContext.volume}
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
          <h3>{playerContext.Name ? playerContext.Name : ""}</h3>

          <ButtonGroup disableElevation variant="contained">
            <Button
              className="button-action"
              onClick={backMusic}
              disabled={!playerContext.index}
            >
              {"<"}
            </Button>
            <Button
              className="button-action"
              onClick={() =>
                setPlayerContext({ playing: !playerContext.playing })
              }
            >
              {playerContext.playing ? <PauseIcon /> : <PlayArrowIcon />}
            </Button>
            <Button className="button-action" onClick={nextMusic}>
              {">"}
            </Button>
          </ButtonGroup>
        </div>

        <ReactPlayer
          ref={refVideo}
          className="react-player"
          url={
            playerContext.Musics && playerContext.Musics[playerContext.index]
              ? playerContext.Musics[playerContext.index].Url
              : ""
          }
          onPause={() => setPlayerContext({ playing: false })}
          onPlay={() => setPlayerContext({ playing: true })}
          onError={() => notify("Não foi possível reproduzir a mídia.")}
          width="100%"
          height="100%"
          controls={false}
          pip={false}
          playing={playerContext.playing}
          onProgress={timeController}
          volume={playerContext.volume / 100}
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
