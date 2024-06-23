import * as React from "react";
import ListSongs from "src/components/ui/ListItems";
import UserActive from "./Components/UserActive";
import { makeStyles } from "@mui/styles";
import { Box, Stack } from "@mui/material";
import MenuItems from "src/components/ui/MenuItem";

import AutocompleteAsync from "src/components/fields/AutocompleteAsync";
import { RoomsUrl, songUrl, userUrl } from "src/apis/request";
import httpRequest from "src/service/httpRequest";

import { useNavigate, useParams } from "react-router-dom";
import { addOrRemoveUser, cloneObj } from "src/utils";
import { useStreaming } from "src/hook";
import { PATH_ROUTER } from "src/routers/routers";
import { useDispatch, useSelector } from "react-redux";
import { RootState, TYPE_REDUCER } from "src/store/configureStore";
import { UserType } from "src/store/UserSlice";
import { songType, triggerSong } from "src/store/SongSlice";
import { LIST_EVENT, publish, subscribe, unsubscribe } from "src/service/event";
import ChangePassword from "./Components/ChangePassword";

const useStyle = makeStyles(() => {
  return {
    container: { display: "flex", flexWrap: "wrap", flexDirection: "column" },
  };
});

const convertData = (listId: number[], listData: looseObj) => {
  return listId.map((idItem) => {
    const dataItem = listData?.[idItem];

    if (dataItem) return dataItem;

    return idItem;
  });
};

type RoomsProps = object & React.PropsWithChildren;

type TRoom = {
  dataUser: looseObj[];
  dataSong: looseObj[];
  roomDetail: looseObj;
};

const Rooms: React.FC<RoomsProps> = () => {
  const userDetail = useSelector(
    (state: RootState) => state[TYPE_REDUCER.USER] as UserType
  );

  const dicSong = React.useRef<looseObj>({});

  const dispatch = useDispatch();

  const params = useParams();

  const classes = useStyle();

  const navigate = useNavigate();

  const [dataRoom, setDataRoom] = React.useState<TRoom>({
    dataUser: [],
    dataSong: [],
    roomDetail: {},
  });

  useStreaming({
    url: RoomsUrl(params.idRoom),
    callBack: async (data) => {
      try {
        const { users = [], songs = [], currentSong } = data;

        // get list data room , user
        const listApi = [
          httpRequest.getDataObj(userUrl()),
          httpRequest.getDataObj(songUrl()),
        ];

        const [userOrigin, songOrigin] = await Promise.all(listApi);

        // covert from id user to info of that user
        const dataUser = convertData(users, userOrigin);

        // covert from id song to info of that song
        const dataSong = convertData(songs, songOrigin);

        setDataRoom({
          dataUser,
          dataSong,
          roomDetail: data,
        });

        // set song when song local and song ob DB is diff
        if (dicSong.current?._id != currentSong && data.status) {
          const objSong = songOrigin[currentSong];

          dicSong.current = objSong;

          return objSong && dispatch(triggerSong(objSong));
        }

        // if current song local match with song in db
        if (dicSong.current._id == currentSong) {
          // play and pause song realtime
          window.callbackFn?.(data.status);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  React.useEffect(() => {
    const cb = async (data: looseObj) => {
      // realtime update song in here

      try {
        const {
          status,
          objSong: { _id: IdSong },
        } = data.detail;

        const body = { currentSong: IdSong, status };

        await httpRequest.getPut(RoomsUrl(params.idRoom), body);
      } catch (error) {
        console.log();
      }
    };

    subscribe(LIST_EVENT.CURRENT_SONG, cb);

    return () => {
      unsubscribe(LIST_EVENT.CURRENT_SONG, cb);
    };
  }, []);

  // list action for menu
  const actionsMenu = React.useMemo(() => {
    let listAction = [
      {
        label: "Back",
        value: "back",
        onChange: async () => {
          try {
            const idUser = userDetail.userInfo?.id;

            addOrRemoveUser({ idRoom: params.idRoom, idUser }, "REMOVE");

            navigate(PATH_ROUTER.ROOMS);
          } catch (error) {
            console.log(error);
          }
        },
      },
    ];

    const dataRoomDetail = dataRoom.roomDetail;

    const dataUserDetail = userDetail.userInfo;

    if (dataUserDetail.id == dataRoomDetail.idOwner) {
      listAction.push({
        label: "Change Password",
        value: "change_password",
        onChange: async () => {
          try {
            return publish(LIST_EVENT.MODAL_GLOBAL, {
              Component: ChangePassword,
              ComponentProps: {
                idRoom: params.idRoom, // Pass the room ID to the modal
              },
            });
          } catch (error) {
            console.log(error);
          }
        },
      });
    }

    return listAction;
  }, [dataRoom]);

  /**
   * add or remove song
   * @param data
   * @returns
   */
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

  /**
   * play or pause song
   */

  const onPlaySong = async (data: songType) => {
    try {
      const idSong = data?._id;

      if (!idSong) return "";

      const body = {
        currentSong: idSong,
        status: true,
      };

      await httpRequest.getPut(RoomsUrl(params.idRoom), body);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <UserActive data={dataRoom.dataUser} label={"name"} img={"picture"} />
        <MenuItems options={actionsMenu} />
      </Stack>

      <Box sx={{ m: 1 }}></Box>

      <AutocompleteAsync
        url={songUrl()}
        labelOptions={(data) => data.name_song}
        onChange={onChangeSong}
      />

      <ListSongs data={dataRoom.dataSong} onClick={onPlaySong} />
    </div>
  );
};

export default Rooms;
