import axios from "axios";
import {
  confirmFollowingAction,
  createFollowingAction,
  destroyFollowingAction,
} from "./actions";

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
          confirmFollowingAction({
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
          createFollowingAction({
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
      .patch(
        "http://localhost:3001/api/v1/user/accounts/relationships",
        { user_id: userId.id },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const status = response.data;
        dispatch(
          destroyFollowingAction({
            status: status,
          })
        );
      })
      .catch((error) => {
        console.log("error res:", error);
      });
  };
};
