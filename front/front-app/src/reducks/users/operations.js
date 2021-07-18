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

export const getMyFollows = (queryPage, setSumPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    axios
      .get(
        `http://localhost:3001/api/v1/user/accounts/follows/?page=${queryPage}`,
        {
          withCredentials: true,
        }
      )
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
    axios
      .get(
        `http://localhost:3001/api/v1/user/accounts/followers/?page=${queryPage}`,
        {
          withCredentials: true,
        }
      )
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
    axios
      .get(
        `http://localhost:3001/api/v1/user/users/${userId.id}/follows/?page=${queryPage}`,
        {
          withCredentials: true,
        }
      )
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
    axios
      .get(
        `http://localhost:3001/api/v1/user/users/${userId.id}/followers/?page=${queryPage}`,
        {
          withCredentials: true,
        }
      )
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
