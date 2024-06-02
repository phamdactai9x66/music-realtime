import {
  LoaderFunctionArgs,
  RouteObject,
  matchRoutes,
  redirect,
} from "react-router-dom";
import { RoomsUrl } from "src/apis/request";
import { PATH_ROUTER } from "src/routers/routers";
import httpRequest from "src/service/httpRequest";

export const formatData = () => {};

/**
 * Helper function that uses results from `matchRoutes` and builds up the path by navigating the route config
 * @param routes
 * @param location
 * @returns
 */

export function getRouteMatchPath(
  routes: RouteObject[],
  location: Partial<Location> | string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  const matches = matchRoutes(routes, location);

  const getPath = (route: RouteObject) => {
    let path = route.path!;
    if (route.children?.length) {
      path += getPath(route.children[0]);
    }
    return path;
  };
  if (matches?.length) {
    return getPath(matches[0].route);
  }
  return null;
}

/**
 * convert pattern
 * @returns
 */

export const isMatchRouters = () => {
  const data: { path: string }[] = [];
  for (const key in PATH_ROUTER) {
    data.push({
      path: PATH_ROUTER[key],
    });
  }
  return data;
};

/**
 * Protected router require login
 * @param param0
 * @returns
 */

export function protectedLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  const params = new URLSearchParams();

  params.set("from", new URL(request.url).pathname);

  return redirect("/login?" + params.toString());
}

/**
 * clone Obj
 * @param data
 * @returns
 */

export function cloneObj(data: looseObj) {
  return JSON.parse(JSON.stringify(data));
}

/**
 * add or remove user in room
 * @param data
 * @returns
 */

export async function addOrRemoveUser(
  data: { idUser?: string; idRoom?: string },
  type: "ADD" | "REMOVE"
) {
  try {
    const { idUser, idRoom } = data;

    // don't trigger function when user id room no exist
    if (!idRoom || !idUser) return;

    const dataRoom = await httpRequest.getOne(RoomsUrl(idRoom));

    let users = cloneObj(dataRoom?.users || []) as string[];

    // add if song unExist in list
    if (type == "ADD" && !users.includes(idUser)) {
      users.push(idUser);
    }

    // add if song unExist in list
    if (type == "REMOVE" && users.includes(idUser)) {
      users = users.filter((id) => id != idUser);
    }

    const body = {
      users,
    };

    await httpRequest.getPut(RoomsUrl(idRoom), body);
  } catch (error) {
    console.log(error);
  }
}
