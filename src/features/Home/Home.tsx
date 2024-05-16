import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import ListSongs from "src/components/ui/ListItems";
import SlideImage from "./Components/SlideImage";
import {
  DataSnapshot,
  getDatabase,
  onValue,
  ref,
  remove,
  set,
  update,
} from "firebase/database";

type HomeProps = object & React.PropsWithChildren;

const Home: React.FC<HomeProps> = () => {
  const id = React.useId();
  console.log(id);

  const writeUserData = <T extends string>(
    userId: T,
    name: T,
    email: T,
    imageUrl: T
  ) => {
    const db = getDatabase();

    set(ref(db, "users/" + userId), {
      username: name,
      email: email,
      profile_picture: imageUrl,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserData = () => {
    const db = getDatabase();

    const startCount = ref(db, "users");

    onValue(startCount, (response: DataSnapshot) => {
      console.log(response.val());
    });
  };

  const putUserData = () => {
    const db = getDatabase();

    const data = {
      username: "tai pham112222",
      email: "tai.pham@novus-fintech.com",
      profile_picture: "",
    };

    update(ref(db, "users/:r1:"), data)
      .then((res) => {
        console.log("xin chap");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteData = () => {
    const db = getDatabase();
    remove(ref(db, "users/:r1:"))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    // writeUserData(id, "awdaw", "awdawd", "awdawd");

    deleteData();

    return () => {};
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
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          label="Search Songs"
        />
      </FormControl>

      <ListSongs />
    </div>
  );
};

export default Home;
