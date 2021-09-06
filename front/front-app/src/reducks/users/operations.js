import axios from "axios";
import { nowLoadingAction } from "../loading/actions";
import { getUsersAction, showUsersAction } from "./actions";

export const showUsers = (userId) => {
  return async (dispatch) => {
    const apiURL = process.env.REACT_APP_USERS_API_URL + `users/${userId.id}`;
    axios
      .get(apiURL, {
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

export const getMyFollows = (queryPage, setSumPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    const apiURL =
      process.env.REACT_APP_USERS_API_URL +
      `accounts/follows/?page=${queryPage}`;
    axios
      .get(apiURL, {
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

export const getMyFollowers = (queryPage, setSumPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    const apiURL =
      process.env.REACT_APP_USERS_API_URL +
      `accounts/followers/?page=${queryPage}`;
    axios
      .get(apiURL, {
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

export const getUsersFollows = (userId, queryPage, setSumPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    const apiURL =
      process.env.REACT_APP_USERS_API_URL +
      `users/${userId.id}/follows/?page=${queryPage}`;
    axios
      .get(apiURL, {
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

export const getUsersFollowers = (userId, queryPage, setSumPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    const apiURL =
      process.env.REACT_APP_USERS_API_URL +
      `users/${userId.id}/followers/?page=${queryPage}`;
    axios
      .get(apiURL, {
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
