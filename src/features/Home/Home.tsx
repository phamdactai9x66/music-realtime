import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import ListSongs from "src/components/ui/ListItems";
import SlideImage from "./Components/SlideImage";
import httpRequest from "src/service/httpRequest";
import { songUrl } from "src/apis/request";
import { orderByChild, startAfter } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { songType, triggerSong } from "src/store/SongSlice";
import { RootState, TYPE_REDUCER } from "src/store/configureStore";

type HomeProps = object & React.PropsWithChildren;

const Home: React.FC<HomeProps> = () => {
  const [songs, setSongs] = React.useState<looseObj[]>([]);

  const dispatch = useDispatch();

  const timeOutApp = React.useRef<any>();

  const currentUser = useSelector(
    (state: RootState) => state[TYPE_REDUCER.USER]
  );

  console.log(currentUser);

  const handleApiSongs = async (...query: unknown[]) => {
    try {
      const getData = await httpRequest.getData(songUrl(), ...query);

      setSongs(getData);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchSong = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    timeOutApp.current && clearTimeout(timeOutApp.current);

    timeOutApp.current = setTimeout(() => {
      const inputValue = e.target.value;

      if (inputValue) {
        return handleApiSongs(
          orderByChild("name_song"),
          startAfter(inputValue)
        );
      }

      handleApiSongs();
    }, 500);
  };

  const onPlaySong = (data: songType) => {
    dispatch(triggerSong(data));
  };

  React.useEffect(() => {
    handleApiSongs();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
      }}
    >
      <SlideImage />

      <FormControl fullWidth sx={{ mt: 1, mb: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">
          Search Songs
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          onChange={onSearchSong}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          label="Search Songs"
        />
      </FormControl>

      <ListSongs data={songs} onClick={onPlaySong} />
    </div>
  );
};

export default Home;
