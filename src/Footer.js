import React, { useEffect } from "react";
import "./Footer.css";
import { useStateValue } from "./StateProvider";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleFilledOutlined";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import {Grid, Slider} from "@material-ui/core"
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";

function Footer({spotify}){
    const [{ token, currentsong, playing , playbackstate}, dispatch] = useStateValue();
    useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      console.log("🙂",r);

      dispatch({
        type: "SET_PLAYING",
        playing: r.is_playing,
      });
      dispatch({
        type: "SET_CURRENTSONG",
        currentsong: r.item,
      });
      dispatch({
        type: "SET_PLAYSTATE",
        playbackstate: r,
      });
    });
  }, [spotify]);

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
    spotify.getMyCurrentPlaybackState().then((r) => {
        console.log("🙂",r);
  
        dispatch({
          type: "SET_PLAYING",
          playing: r.is_playing,
        });
        dispatch({
          type: "SET_PLAYSTATE",
          playbackstate: r,
        });
      });
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
    spotify.getMyCurrentPlaybackState().then((r) => {
        console.log("🙂",r);
        dispatch({
          type: "SET_PLAYING",
          playing: r.is_playing,
        });
        dispatch({
          type: "SET_PLAYSTATE",
          playbackstate: r,
        });
      });
  };
  function msToHMS( ms ) {
    var seconds = ms / 1000;
    seconds = seconds % 3600; // seconds remaining after extracting hours
  
    var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
    seconds = Math.floor(seconds % 60);
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    var hms = minutes+":"+seconds;
    return hms;
  }
  setInterval(()=>{
        spotify.getMyCurrentPlaybackState().then((r) => {
          console.log("🙂",r);
    
          dispatch({
            type: "SET_PLAYING",
            playing: r.is_playing,
          });
          dispatch({
            type: "SET_CURRENTSONG",
            currentsong: r.item,
          });
          dispatch({
            type: "SET_PLAYSTATE",
            playbackstate: r,
          });
    
        });
  }, playbackstate?playbackstate.item.duration_ms:60000)
  console.log(playbackstate)
    return(
        <div className="footer">
        <div className="footer__left">
          <img
            className="footer__albumLogo"
            src={playbackstate.item?.album.images[0].url}
            alt={playbackstate.item?.name}
          />
          {currentsong ? (
            <div className="footer__songInfo">
              <h4>{playbackstate?.item?.name}</h4>
              <p>{playbackstate?.item?.artists.map((artist) => artist.name).join(", ")}</p>
              <p>{playbackstate?msToHMS(playbackstate.item.duration_ms):`--:--`} / {msToHMS(playbackstate.progress_ms)}</p>
            </div>
          ) : (
            <div className="footer__songInfo">
              <h4>No song is playing</h4>
              <p>...</p>
            </div>
          )}
        </div>
  
        <div className="footer__center">
          <ShuffleIcon className="footer__green" />
          <SkipPreviousIcon onClick={skipPrevious} className="footer__icon" />
          {playing ? (
            <PauseCircleOutlineIcon
              onClick={handlePlayPause}
              fontSize="large"
              className="footer__icon"
            />
          ) : (
            <PlayCircleOutlineIcon
              onClick={handlePlayPause}
              fontSize="large"
              className="footer__icon"
            />
          )}
          <SkipNextIcon onClick={skipNext} className="footer__icon" />
          <RepeatIcon className="footer__green" />
        </div>
        <div className="footer__right">
          <Grid container spacing={2}>
            <Grid item>
              <PlaylistPlayIcon />
            </Grid>
            <Grid item>
              <VolumeDownIcon />
            </Grid>
            <Grid item xs>
              <Slider value={playbackstate?playbackstate.device.volume_percent:100} aria-labelledby="continuous-slider" />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

export default Footer;