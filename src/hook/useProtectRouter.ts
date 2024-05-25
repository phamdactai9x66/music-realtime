import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH_ROUTER } from "src/routers/routers";
import { UserType } from "src/store/UserSlice";
import { RootState, TYPE_REDUCER } from "src/store/configureStore";

const useProtectRoute = () => {
  const local = useLocation();
  const navigate = useNavigate();

  const currentUser = useSelector(
    (state: RootState) => state[TYPE_REDUCER.USER] as UserType
  );

  // navigate user to home page when user logged
  if (currentUser.isLogin && PATH_ROUTER.LOGIN == local.pathname) {
    navigate(PATH_ROUTER.ROOT);
  }
};

export default useProtectRoute;
