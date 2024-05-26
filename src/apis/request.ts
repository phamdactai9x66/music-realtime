export const songUrl = () => {
  return "songs";
};

export const userUrl = (idUser?: string | undefined) => {
  let url = "users";

  idUser && (url += `/${idUser}`);

  return url;
};

export const RoomsUrl = () => {
  return "room";
};
