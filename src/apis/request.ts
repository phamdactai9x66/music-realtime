export const songUrl = () => {
  return "songs";
};

export const userUrl = (idUser?: string | undefined) => {
  let url = "users";

  idUser && (url += `/${idUser}`);

  return url;
};

export const myFavoritesUrl = (idFavorites?: string | undefined) => {
  let url = "my_favorites";

  idFavorites && (url += `/${idFavorites}`);

  return url;
};
