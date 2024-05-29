import * as React from "react";
import ListRooms from "src/components/ui/ListItems";
import UserActive from "./Components/UserActive";
import { makeStyles } from "@mui/styles";
import { Box, Stack } from "@mui/material";
import MenuItems from "src/components/ui/MenuItem";

import AutocompleteAsync from "src/components/fields/AutocompleteAsync";
import { songUrl } from "src/apis/request";

const useStyle = makeStyles(() => {
  return {
    container: { display: "flex", flexWrap: "wrap", flexDirection: "column" },
  };
});

type RoomsProps = object & React.PropsWithChildren;

const Rooms: React.FC<RoomsProps> = () => {
  const classes = useStyle();

  return (
    <div className={classes.container}>
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <UserActive />
        <MenuItems />
      </Stack>

      <Box sx={{ m: 1 }}></Box>

      <AutocompleteAsync
        url={songUrl()}
        labelOptions={(data) => data.name_song}
      />

      <ListRooms />
    </div>
  );
};

export default Rooms;
