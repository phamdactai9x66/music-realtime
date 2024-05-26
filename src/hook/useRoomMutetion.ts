import React from "react";
import { RoomsUrl } from "src/apis/request";
import { roomsIf } from "src/models/Room.model";
import httpRequest from "src/service/httpRequest";

const useRoomMutetion = () => {
  const [roomsData, setRoomsData] = React.useState<roomsIf[] | []>([]);

  const searchRooms = async (...query: unknown[]) => {
    const data = await httpRequest.getData<roomsIf>(RoomsUrl(), ...query);
    setRoomsData(data);
  };
  return {
    searchRooms,
    roomsData,
  };
};

export default useRoomMutetion;
