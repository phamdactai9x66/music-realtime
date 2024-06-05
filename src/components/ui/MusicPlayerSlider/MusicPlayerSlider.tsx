import * as React from "react";
import { Theme, styled, useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import {
  PauseRounded,
  PlayArrowRounded,
  FastForwardRounded,
  FastRewindRounded,
} from "@mui/icons-material";

import { useLocation } from "react-router-dom";
import { DISPLAY_AUDIO } from "src/routers/routers";
import { getRouteMatchPath, isMatchRouters } from "src/utils";
import { useSelector } from "react-redux";
import { RootState, TYPE_REDUCER } from "src/store/configureStore";
import { songType } from "src/store/SongSlice";
import MyFavorites from "./Components/MyFavorites";
import { LIST_EVENT, publish } from "src/service/event";

const useStyle = makeStyles((theme: Theme) => {
  return {
    containerBox: {
      position: "fixed",
      bottom: 0,
      left: 0,
      padding: `0 1em`,
      background: theme.palette.background.paper,
    },
    playAudio: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      mt: -1,
    },
    myFavorites: {
      position: "absolute !important",
      right: 0,
    },
  };
});

const CoverImage = styled("div")(() => ({
  width: 100,
  height: 100,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

export default function MusicPlayerSlider() {
  const theme = useTheme();

  const currentSong = useSelector(
    (state: RootState) => state[TYPE_REDUCER.SONG] as songType
  );

  const audioPlayer = React.useRef<HTMLAudioElement>(null); // reference our audio component

  const location = useLocation();

  const [isPlaying, setIsPlaying] = React.useState(false);

  const currentPattern = getRouteMatchPath(isMatchRouters(), location);

  const classes = useStyle();

  /**
   *   // switch song
   */

  React.useEffect(() => {
    if (audioPlayer.current && currentSong.audio_url) {
      // reset new song

      audioPlayer.current.currentTime = 0;

      audioPlayer.current.play();

      return setIsPlaying(true);
    }
    return () => {
      // trigger when switching song

      if (audioPlayer.current && currentSong.audio_url) {
        // pause old song
        audioPlayer.current.pause();

        setIsPlaying(false);
      }
    };
  }, [currentSong.audio_url]);

  if (!currentSong.audio_url) return;

  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";

  /**
   * toggle play or pause for song
   * @returns
   */

  const togglePlayPause = () => {
    if (!audioPlayer.current) return;

    setIsPlaying((isPlaying) => {
      const changeStatus = !isPlaying;

      // update status song
      changeStatus
        ? audioPlayer.current?.play?.()
        : audioPlayer.current?.pause?.();

      // register event status song
      publish(LIST_EVENT.CURRENT_SONG, {
        status: changeStatus,
        objSong: currentSong,
      });

      return changeStatus;
    });
  };

  return (
    <Box
      className={classes.containerBox}
      sx={{
        width: "100%",
        overflow: "hidden",
        visibility: DISPLAY_AUDIO?.[currentPattern] ? "visible" : "hidden",
      }}
    >
      <audio ref={audioPlayer} src={currentSong.audio_url}></audio>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CoverImage>
          <img alt="can't win - Chilling Sunday" src={currentSong.image_song} />
        </CoverImage>

        <Box sx={{ ml: 1.5, minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {currentSong?.name_authors}
          </Typography>

          <Typography noWrap>{currentSong?.name_song}</Typography>

          <Typography noWrap letterSpacing={-0.25}>
            {currentSong?.description}
          </Typography>
        </Box>
      </Box>

      <Box className={classes.playAudio}>
        {/* back previous song */}

        <IconButton aria-label="previous song">
          <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
        </IconButton>
        {/* play and pause song */}

        <IconButton
          aria-label={isPlaying ? "play" : "pause"}
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <PauseRounded sx={{ fontSize: "3rem" }} htmlColor={mainIconColor} />
          ) : (
            <PlayArrowRounded
              sx={{ fontSize: "3rem" }}
              htmlColor={mainIconColor}
            />
          )}
        </IconButton>
        {/* next song */}

        <IconButton aria-label="next song">
          <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
        </IconButton>

        <MyFavorites />
      </Box>
    </Box>
  );
}
