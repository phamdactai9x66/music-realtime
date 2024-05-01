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

const useStyle = makeStyles((theme: Theme) => {
  console.log(theme);
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

  const location = useLocation();

  const classes = useStyle();

  const [paused, setPaused] = React.useState(false);

  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";

  return (
    <Box
      className={classes.containerBox}
      sx={{
        width: "100%",
        overflow: "hidden",
        visibility: DISPLAY_AUDIO[location.pathname] ? "visible" : "hidden",
      }}
    >
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
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: -2,
        }}
      >
        <TinyText>{formatDuration(position)}</TinyText>
        <TinyText>-{formatDuration(duration - position)}</TinyText>
      </Box> */}
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
          aria-label={paused ? "play" : "pause"}
          onClick={() => setPaused(!paused)}
        >
          {paused ? (
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
