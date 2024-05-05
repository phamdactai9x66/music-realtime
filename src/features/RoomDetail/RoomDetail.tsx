import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import ListRooms from "src/components/ui/ListItems";
import UserActive from "./Components/UserActive";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

const useStyle = makeStyles(() => {
  return {
    container: { display: "flex", flexWrap: "wrap", flexDirection: "column" },
  };
});

type RoomsProps = object & React.PropsWithChildren;

const Rooms: React.FC<RoomsProps> = () => {
  const classes = useStyle();

  const renderInputSearch = () => {
    return (
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">
          Search Songs
        </InputLabel>

        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          label="Search Songs"
        />
      </FormControl>
    );
  };

  return (
    <div className={classes.container}>
      <UserActive />

      <Box sx={{ m: 1 }}></Box>

      {renderInputSearch()}

      <ListRooms />
    </div>
  );
};

export default Rooms;
