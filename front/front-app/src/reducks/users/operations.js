import axios from "axios";
import { nowLoadingAction } from "../loading/actions";
import { getUsersAction, showUsersAction } from "./actions";

export const showUsers = (userId) => {
  return async (dispatch) => {
    axios
      .get(`http://localhost:3001/api/v1/user/users/${userId.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        const user = response.data;
        dispatch(
          showUsersAction({
            id: user.id,
            name: user.name,
            nickname: user.nickname,
            introduction: user.introduction,
            userIcon: user.image.url,
          })
        );
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };
};

export const getMyFollows = (setSumPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    axios
      .get("http://localhost:3001/api/v1/user/accounts/follows", {
        withCredentials: true,
      })
      .then((response) => {
        const follows = response.data.follows;
        dispatch(getUsersAction(follows));
        setSumPage(response.data.page_length);
      })
      .catch((error) => {
        console.log("error:", error);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(nowLoadingAction(false));
        }, 800);
      });
  };
};

export const getMyFollowers = (setSumPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    axios
      .get("http://localhost:3001/api/v1/user/accounts/followers", {
        withCredentials: true,
      })
      .then((response) => {
        const followers = response.data.followers;
        dispatch(getUsersAction(followers));
        setSumPage(response.data.page_length);
      })
      .catch((error) => {
        console.log("error:", error);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(nowLoadingAction(false));
        }, 800);
      });
  };
};
