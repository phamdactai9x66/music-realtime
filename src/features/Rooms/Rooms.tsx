import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import ListRooms from "./Components/ListRooms";
import { debounce } from "@mui/material";
import { orderByChild, startAfter } from "firebase/database";
import useRoomMutation from "src/hook/useRoomMutation";
import { RoomsUrl } from "src/apis/request";
import { roomsIf } from "src/models/Room.model";


type RoomsProps = object & React.PropsWithChildren;

const Rooms: React.FC<RoomsProps> = () => {
  const { searchRooms, roomsData } = useRoomMutation<roomsIf>();
  const onsearchRoom = debounce(
    async (val: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inputValue = val.target.value;
      if (inputValue) {
        return await searchRooms(
          RoomsUrl(),
          orderByChild("nameRoom"),
          startAfter(inputValue)
        );
      }
      searchRooms(RoomsUrl());
    },
    500
  );
  React.useEffect(() => {
    searchRooms(RoomsUrl());
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">Search Room</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          onChange={onsearchRoom}
          label="Search Songs"
        />
      </FormControl>

      <ListRooms listRoomData={roomsData} />
    </div>
  );
};

export default Rooms;
