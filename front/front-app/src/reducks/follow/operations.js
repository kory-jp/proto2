import axios from "axios";
import { setFollowingAction } from "./actions";

export const confirmFollowing = (userId) => {
  return async (dispatch) => {
    const apiURL =
      process.env.REACT_APP_USERS_API_URL +
      "accounts/relationships/following_by";
    axios
      .post(
        apiURL,
        { user_id: userId.id },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const status = response.data;
        dispatch(
          setFollowingAction({
            status: status,
          })
        );
      })
      .catch((error) => {
        console.log("error res:", error);
      });
  };
};

export const createFollowing = (userId) => {
  return async (dispatch) => {
    const apiURL =
      process.env.REACT_APP_USERS_API_URL + "accounts/relationships";
    axios
      .post(
        apiURL,
        { user_id: userId.id },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const status = response.data;
        dispatch(
          setFollowingAction({
            status: status,
          })
        );
      })
      .catch((error) => {
        console.log("error res:", error);
      });
  };
};

export const destroyFollowing = (userId) => {
  return async (dispatch) => {
    const apiURL =
      process.env.REACT_APP_USERS_API_URL +
      `accounts/relationships?user_id=${userId.id}`;
    axios
      .delete(apiURL, {
        withCredentials: true,
      })
      .then((response) => {
        const status = response.data;
        dispatch(
          setFollowingAction({
            status: status,
          })
        );
      })
      .catch((error) => {
        console.log("error res:", error);
      });
  };
};
