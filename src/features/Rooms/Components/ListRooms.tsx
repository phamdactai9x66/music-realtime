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
import { roomsIf } from "src/models/Room.model";
type Props = {
  listRoomData: roomsIf[] | [];
};

const ListRooms = ({ listRoomData }: Props) => {
  const navigate = useNavigate();

  const handleNavigate = (idRoom: string) => () => {
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
      {listRoomData.length > 0 &&
        listRoomData.map((e, index) => {
          const { _id, nameRoom, users } = e;
          const currentUser = Object.values(users).map(() => ({
            _id: e._id,
            fullName: e.nameRoom,
            image: e.password,
          }));
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
                      <AvatarGroup total={currentUser.length}>
                        {currentUser.map((user) => (
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
              {listRoomData.length != index && (
                <Divider component="li" variant="middle" />
              )}
            </React.Fragment>
          );
        })}
    </List>
  );
};

export default ListRooms;
