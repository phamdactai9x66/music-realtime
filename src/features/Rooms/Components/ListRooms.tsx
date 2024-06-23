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
import { useSelector } from "react-redux";
import { RootState, TYPE_REDUCER } from "src/store/configureStore";
import { UserType } from "src/store/UserSlice";

import { addOrRemoveUser } from "src/utils";

import KeyIcon from "@mui/icons-material/Key";
import httpRequest from "src/service/httpRequest";
import { RoomsUrl } from "src/apis/request";
import VerifyPassword from "src/components/ui/FormVertifyPassword/FormVerifyPassword";
import { LIST_EVENT, publish } from "src/service/event";

type Props = {
  listRoomData: looseObj[] | [];
} & React.PropsWithChildren;

const ListRooms: React.FC<Props> = (props) => {
  const userDetail = useSelector(
    (state: RootState) => state[TYPE_REDUCER.USER] as UserType
  );

  const navigate = useNavigate();

  const { listRoomData } = props;

  const handleNavigateRoom = async (idRoom: string) => {
    try {
      const idUser = userDetail.userInfo?.id;

      addOrRemoveUser({ idRoom, idUser }, "ADD");

      navigate(`${PATH_ROUTER.ROOMS}/${idRoom}`);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Handles navigation to a room. If the room requires a password, it will
   * display a password verification modal. Otherwise, it will navigate to the
   * room.
   *
   * @param {string} idRoom - The ID of the room to navigate to.
   * @returns {Promise<void>} A promise that resolves when navigation is complete.
   */
  const handleNavigate = (idRoom: string) => async () => {
    try {
      const cb = () => {
        // Navigate to the room
        handleNavigateRoom(idRoom);
      };

      // Retrieve room data from the server
      const dataRes = await httpRequest.getOne(RoomsUrl(idRoom));

      // If the room requires a password, display a password verification modal
      if (dataRes.allowPassword) {
        return publish(LIST_EVENT.MODAL_GLOBAL, {
          Component: VerifyPassword,
          ComponentProps: {
            idRoom, // Pass the room ID to the modal
            callBack: cb,
          },
        });
      }

      cb();
    } catch (error) {
      // If an error occurs, log it
      console.log(error);
    }
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
          const { _id, name_room, users, allowPassword } = e;

          return (
            <React.Fragment key={_id}>
              {/* render room */}
              <ListItem alignItems="flex-start" onClick={handleNavigate(_id)}>
                {/* name room */}
                <ListItemText
                  primary={name_room}
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
                      <AvatarGroup total={users?.length}>
                        {(users || []).map((user: looseObj) => (
                          <Avatar key={user._id} />
                        ))}
                      </AvatarGroup>
                      {/* require password */}
                      {allowPassword && (
                        <IconButton>
                          <KeyIcon />
                        </IconButton>
                      )}
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
