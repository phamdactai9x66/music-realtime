import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { RootState, TYPE_REDUCER } from "src/store/configureStore";
import { UserType } from "src/store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import httpRequest from "src/service/httpRequest";
import { myFavoritesUrl, songUrl } from "src/apis/request";
import { equalTo, orderByChild } from "firebase/database";
import { songType, triggerSong } from "src/store/SongSlice";

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

  const [listFavorites, setListFavorites] = React.useState<looseObj[]>([]);
  const dispatch = useDispatch();

  const userDetail = useSelector(
    (state: RootState) => state[TYPE_REDUCER.USER] as UserType
  );

  // list favorites only show when user logged
  if (!userDetail.isLogin) return <></>;

  /**
   * call api get list favorites base on user
   */
  const handleListFavorites = async () => {
    try {
      const idUser = userDetail.userInfo?.id || "";

      const res = await httpRequest.getData(
        myFavoritesUrl(),
        orderByChild("id_user"),
        equalTo(idUser)
      );

      setListFavorites(res);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * play song in favorites
   * @param idSong
   * @returns
   */
  const onPlayFavorite = (idSong: string) => async () => {
    const getData = (await httpRequest.getOne(songUrl(idSong))) as songType;

    getData && dispatch(triggerSong(getData));
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    handleListFavorites();
  }, [userDetail.userInfo.id]);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography>My Favorite</Typography>
      {/* list images */}
      <ImageList cols={3} className={classes.containerImage}>
        {listFavorites.map((item) => {
          const { _id, id_song, image_song } = item || [];

          return (
            <ImageListItem key={_id} onClick={onPlayFavorite(id_song)}>
              <img
                srcSet={`${image_song}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${image_song}?w=164&h=164&fit=crop&auto=format`}
                loading="lazy"
              />
            </ImageListItem>
          );
        })}
      </ImageList>

      {/* pagination */}
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
