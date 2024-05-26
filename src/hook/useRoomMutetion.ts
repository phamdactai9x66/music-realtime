import React from "react";
import httpRequest from "src/service/httpRequest";

const useRoomMutetion = () => {
  const [roomsData, setRoomsData] = React.useState<any>([]);

  const searchRooms = async <T>(fuc: string, ...query: unknown[]) => {
    const data = await httpRequest.getData<T>(fuc, ...query);
    setRoomsData(data);
  };
  return {
    searchRooms,
    roomsData,
  };
};

export default useRoomMutetion;
