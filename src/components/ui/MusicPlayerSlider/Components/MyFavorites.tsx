import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import IconButton from "@mui/material/IconButton";

import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState, TYPE_REDUCER } from "src/store/configureStore";
import { UserType } from "src/store/UserSlice";
import { songType } from "src/store/SongSlice";
import httpRequest from "src/service/httpRequest";
import { myFavoritesUrl } from "src/apis/request";
import { debounce } from "@mui/material";
import { equalTo, orderByChild } from "firebase/database";

const useStyle = makeStyles(() => {
  return {
    myFavorites: {
      position: "absolute !important",
      right: 0,
    },
  };
});

type MyFavoritesProps = object | React.PropsWithChildren;

const MyFavorites: React.FC<MyFavoritesProps> = () => {
  const currentSong = useSelector(
    (state: RootState) => state[TYPE_REDUCER.SONG] as songType
  );

  const userDetail = useSelector(
    (state: RootState) => state[TYPE_REDUCER.USER] as UserType
  );

  const theme = useTheme();

  const classes = useStyle();

  const [isMyFavorites, setIsMyFavorites] = React.useState(false);

  const dataFavorites = React.useRef<looseObj | undefined>({});

  /**
   * set init my favorites
   */

  const handleApiMyFavorites = debounce(async () => {
    try {
      const idUser = userDetail.userInfo.id;

      if (idUser) {
        // find song in list favorites
        const dataResponse = await httpRequest.getData(
          myFavoritesUrl(),
          orderByChild("id_song"),
          equalTo(currentSong._id)
        );

        // find user in list favorites
        const isFavorites = dataResponse.find((e) => e.id_user == idUser);

        dataFavorites.current = isFavorites;

        setIsMyFavorites(!!isFavorites);
      }
    } catch (error) {
      console.log(error);
    }
  }, 1000);

  React.useEffect(() => {
    userDetail.isLogin && handleApiMyFavorites();
  }, [currentSong._id, userDetail.userInfo.id]);

  // only show button my Favorites when user logged
  if (!userDetail.isLogin) return <></>;

  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";

  /**
   * toggle mark and unMark song
   */

  const toggleFavorites = async () => {
    try {
      // remove song when this song in list favorites of user

      if (isMyFavorites) {
        await httpRequest.getDelete(myFavoritesUrl(dataFavorites.current?._id));
        return setIsMyFavorites(false);
      }

      // add song when this song no in list favorites of user

      const body = {
        id_song: currentSong._id,
        id_user: userDetail.userInfo.id,
      };

      await httpRequest.getPost(myFavoritesUrl(), body);

      setIsMyFavorites(true);
    } catch (error) {
      console.log(error);
    }
  };

  let iconFavorites = (
    <FavoriteBorder fontSize="medium" htmlColor={mainIconColor} />
  );

  if (isMyFavorites)
    iconFavorites = <Favorite fontSize="medium" htmlColor={mainIconColor} />;

  return (
    <IconButton className={classes.myFavorites} onClick={toggleFavorites}>
      {iconFavorites}
    </IconButton>
  );
};

export default MyFavorites;
