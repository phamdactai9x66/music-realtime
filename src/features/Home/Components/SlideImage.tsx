import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const useStyles = makeStyles((theme: Theme) => {
  return {
    containerImage: {
      "& img": {
        borderRadius: theme.spacing(1),
      },
    },
  };
});

export default function StandardImageList() {
  const classes = useStyles();

  return (
    <Box sx={{ width: "100%" }}>
      <Typography>My Favorite</Typography>
      <ImageList cols={3} className={classes.containerImage}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Stack spacing={2}>
        <Pagination
          count={4}
          variant="outlined"
          shape="rounded"
          sx={{ display: "flex", justifyContent: "flex-end" }}
        />
      </Stack>
    </Box>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
];
