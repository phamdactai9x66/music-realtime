import * as React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useSelector } from "react-redux";
import { RootState, TYPE_REDUCER } from "src/store/configureStore";
import { UserType } from "src/store/UserSlice";
import httpRequest from "src/service/httpRequest";
import { RoomsUrl } from "src/apis/request";
import { useParams } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

type BadgeAvatarsProps = {
  data?: looseObj[];
  label?: string;
  img?: string;
  isOwner?: boolean;
} & React.PropsWithChildren;

const SmallAvatar = styled(CancelRoundedIcon)(({ theme }) => ({
  width: 20,
  height: 20,
  cursor: "pointer",
}));

export default function BadgeAvatars(props: BadgeAvatarsProps) {
  const { data = [], label = "", img = "", isOwner } = props || {};

  const params = useParams();

  const userDetail = useSelector(
    (state: RootState) => state[TYPE_REDUCER.USER] as UserType
  );

  const handleKickUser = async (curr: looseObj) => {
    // don't allow kick yourself
    if (userDetail.userInfo?.id == curr?._id) return;

    const filterUsers = data
      .filter((item) => item?._id != curr?._id)
      .map((e) => e?.id || e._id || e);

    await httpRequest.getPut(RoomsUrl(params.idRoom), { users: filterUsers });
  };

  return (
    <Stack direction="row" spacing={2}>
      {data.map((curr: looseObj) => {
        const labelItem = curr?.[label] || "";

        const imgItem = curr?.[img] || "";

        const isSelf = userDetail?.userInfo?.id != curr?.id;

        return (
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            badgeContent={
              isOwner && isSelf ? <SmallAvatar color="error" /> : null
            }
            onClick={() => {
              isOwner && isSelf && handleKickUser(curr);
            }}
          >
            <StyledBadge
              overlap="circular"
              key={curr?._id}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={labelItem} src={imgItem} />
            </StyledBadge>
          </Badge>
        );
      })}
    </Stack>
  );
}
