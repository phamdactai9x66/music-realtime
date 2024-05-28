import React from "react";
import httpRequest from "src/service/httpRequest";

const useRoomMutation = <T>() => {
  const [roomsData, setRoomsData] = React.useState<T[]>([]);

  const searchRooms = async (fuc: string, ...query: unknown[]) => {
    const data = await httpRequest.getData<T>(fuc, ...query);
    setRoomsData(data);
  };
  return {
    searchRooms,
    roomsData,
  };
};

export default useRoomMutation;
