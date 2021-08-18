import axios from "axios";
import { setFollowingAction } from "./actions";

export const confirmFollowing = (userId) => {
  return async (dispatch) => {
    axios
      .post(
        "http://localhost:3001/api/v1/user/accounts/relationships/following_by",
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
    axios
      .post(
        "http://localhost:3001/api/v1/user/accounts/relationships",
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
    axios
      .delete(
        `http://localhost:3001/api/v1/user/accounts/relationships?user_id=${userId.id}`,
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
