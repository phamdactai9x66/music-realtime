import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import IconButton from "@mui/material/IconButton";

import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState, TYPE_REDUCER } from "src/store/configureStore";
import { UserType } from "src/store/UserSlice";

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
  const theme = useTheme();

  const classes = useStyle();

  const [isMyFavorites, setIsMyFavorites] = React.useState(false);

  const userDetail = useSelector(
    (state: RootState) => state[TYPE_REDUCER.USER] as UserType
  );

  // only show button my Favorites when user logged
  if (!userDetail.isLogin) return <></>;

  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";

  /**
   * toggle mark and unMark song
   */

  const toggleFavorites = () => {
    setIsMyFavorites((pre) => !pre);
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
