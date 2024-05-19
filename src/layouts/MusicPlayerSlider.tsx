import * as React from "react";
import { Theme, styled, useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import { useLocation } from "react-router-dom";
import { DISPLAY_AUDIO } from "src/routers/routers";
import { getRouteMatchPath, isMatchRouters } from "src/utils";

const LIST_AUDIO = [
  {
    title: "awd",
    url: "https://firebasestorage.googleapis.com/v0/b/music-realtime-34252.appspot.com/o/StockTune-Evening%20Velvet%20Chill_1716113269.mp3?alt=media&token=58b99e15-c0cc-4e44-9e73-3022bf3a2963",
  },

  {
    title: "awd1231",
    url: "https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3",
  },
];

const useStyle = makeStyles((theme: Theme) => {
  return {
    containerBox: {
      position: "fixed",
      bottom: 0,
      left: 0,
      padding: `0 1em`,
      background: theme.palette.background.paper,
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

  const audioPlayer = React.useRef<HTMLAudioElement>(null); // reference our audio component

  const [audio, setAudio] = React.useState(LIST_AUDIO[0]);

  const location = useLocation();

  const [isPlaying, setIsPlaying] = React.useState(false);

  const currentPattern = getRouteMatchPath(isMatchRouters(), location);

  const classes = useStyle();

  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";

  const togglePlayPause = () => {
    if (!audioPlayer.current) return;

    const prevValue = isPlaying;

    setIsPlaying(!prevValue);

    if (!prevValue) return audioPlayer.current.play();

    audioPlayer.current.pause();
  };

  // const nextSong = (step: number) => () => {
  //   const nextSong = LIST_AUDIO.findIndex((e) => e.title == audio.title);

  //   if (nextSong != -1 && audioPlayer.current) {
  //     setAudio(LIST_AUDIO[nextSong + step]);

  //     audioPlayer.current.currentTime = 0;
  //     setIsPlaying(false);
  //   }
  // };

  return (
    <Box
      className={classes.containerBox}
      sx={{
        width: "100%",
        overflow: "hidden",
        visibility: DISPLAY_AUDIO?.[currentPattern] ? "visible" : "hidden",
      }}
    >
      <audio ref={audioPlayer} src={audio.url}></audio>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CoverImage>
          <img
            alt="can't win - Chilling Sunday"
            src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
          />
        </CoverImage>
        <Box sx={{ ml: 1.5, minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            Jun Pulse
          </Typography>
          <Typography noWrap>
            <b>คนเก่าเขาทำไว้ดี (Can&apos;t win)</b>
          </Typography>
          <Typography noWrap letterSpacing={-0.25}>
            Chilling Sunday &mdash; คนเก่าเขาทำไว้ดี
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: -1,
        }}
      >
        <IconButton aria-label="previous song">
          <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
        </IconButton>
        <IconButton
          aria-label={isPlaying ? "play" : "pause"}
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <PlayArrowRounded
              sx={{ fontSize: "3rem" }}
              htmlColor={mainIconColor}
            />
          ) : (
            <PauseRounded sx={{ fontSize: "3rem" }} htmlColor={mainIconColor} />
          )}
        </IconButton>
        <IconButton aria-label="next song">
          <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
        </IconButton>
      </Box>
    </Box>
  );
}
