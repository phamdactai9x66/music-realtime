import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PATH_ROUTER } from "src/routers/routers";

import KeyIcon from "@mui/icons-material/Key";

const fakeData = [
  {
    _id: 0,
    nameRoom: "Brunch this weekend?",
    users: [
      {
        _id: 0,
        fullName: "tai Pham",
        image: "",
      },
      {
        _id: 1,
        fullName: "thang Pham",
        image: "",
      },
      {
        _id: 2,
        fullName: "teo Pham",
        image: "",
      },
    ],
  },
  {
    _id: 1,
    nameRoom: "Summer BBQ",
    users: [
      {
        _id: 0,
        fullName: "tai Pham",
        image: "",
      },
      {
        _id: 1,
        fullName: "thang Pham",
        image: "",
      },
      {
        _id: 2,
        fullName: "teo Pham",
        image: "",
      },
    ],
  },
];

const ListRooms = () => {
  const navigate = useNavigate();

  const handleNavigate = (idRoom: number) => () => {
    if ((idRoom ?? null) === null) return;

    navigate(`${PATH_ROUTER.ROOMS}/${idRoom}`);
  };

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        overflow: "auto",
        maxHeight: "calc(100vh - 200px)",
        paddingRight: (theme) => {
          return theme.spacing(2);
        },
      }}
    >
      {fakeData.map((e, index) => {
        const { _id, nameRoom, users } = e;

        return (
          <React.Fragment key={_id}>
            {/* render room */}
            <ListItem alignItems="flex-start" onClick={handleNavigate(_id)}>
              {/* name room */}
              <ListItemText
                primary={nameRoom}
                secondary={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      "& .MuiAvatar-root": {
                        width: 24,
                        height: 24,
                        fontSize: 14,
                      },
                    }}
                  >
                    {/* list avatars */}
                    <AvatarGroup total={users.length}>
                      {users.map((user) => (
                        <Avatar
                          key={user._id}
                          alt={user.fullName}
                          src={user.image}
                        />
                      ))}
                    </AvatarGroup>
                    <IconButton>
                      <KeyIcon />
                    </IconButton>
                  </Box>
                }
              />
            </ListItem>

            {/* if this row is last item don't show divider */}
            {fakeData.length != index && (
              <Divider variant="middle" component="li" />
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default ListRooms;
