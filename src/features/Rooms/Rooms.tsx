import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import ListRooms from "./Components/ListRooms";
import { debounce } from "@mui/material";
import { orderByChild, startAfter } from "firebase/database";
import { RoomsUrl } from "src/apis/request";
import httpRequest from "src/service/httpRequest";

type RoomsProps = object & React.PropsWithChildren;

const Rooms: React.FC<RoomsProps> = () => {
  const [Rooms, setRooms] = React.useState<looseObj[]>([]);

  const handleApiRooms = async (...query: unknown[]) => {
    try {
      const getData = await httpRequest.getData(RoomsUrl(), ...query);

      setRooms(getData);
    } catch (error) {
      console.log(error);
    }
  };

  const onsearchRoom = debounce(
    async (val: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inputValue = val.target.value;

      if (inputValue) {
        return await handleApiRooms(
          orderByChild("name_room"),
          startAfter(inputValue, "name_room")
        );
      }

      handleApiRooms();
    },
    import.meta.env.VITE_TIME_SEARCH
  );

  React.useEffect(() => {
    handleApiRooms();
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
          label="Search Rooms"
        />
      </FormControl>

      <ListRooms listRoomData={Rooms} />
    </div>
  );
};

export default Rooms;
