import * as React from "react";
import ListRooms from "src/components/ui/ListItems";
import UserActive from "./Components/UserActive";
import { makeStyles } from "@mui/styles";
import { Box, Stack } from "@mui/material";
import MenuItems from "src/components/ui/MenuItem";

import AutocompleteAsync from "src/components/fields/AutocompleteAsync";
import { RoomsUrl, songUrl } from "src/apis/request";
import httpRequest from "src/service/httpRequest";

import { useParams } from "react-router-dom";
import { cloneObj } from "src/utils";

const useStyle = makeStyles(() => {
  return {
    container: { display: "flex", flexWrap: "wrap", flexDirection: "column" },
  };
});

type RoomsProps = object & React.PropsWithChildren;

const Rooms: React.FC<RoomsProps> = () => {
  const params = useParams();

  const classes = useStyle();

  const onChangeSong = async (data: looseObj) => {
    try {
      const idSong = data._id;

      if (!idSong) return "";

      const dataRoom = await httpRequest.getOne(RoomsUrl(params.idRoom));

      let songs = cloneObj(dataRoom?.songs || []) as string[];

      // remove if song exist in list
      if (songs.includes(idSong)) {
        songs = songs.filter((e) => e !== idSong);
      } else {
        // add if song unExist in list
        songs.push(idSong);
      }

      const body = {
        songs,
      };

      await httpRequest.getPut(RoomsUrl(params.idRoom), body);
    } catch (error) {
      console.log(error);
    }
  };

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
        onChange={onChangeSong}
      />

      <ListRooms />
    </div>
  );
};

export default Rooms;
