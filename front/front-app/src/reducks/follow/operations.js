import axios from "axios";
import { nowLoadingAction } from "../loading/actions";
import {
  confirmFollowingAction,
  createFollowingAction,
  destroyFollowingAction,
} from "./actions";

export const confirmFollowing = (userId) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
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
      })
      .finally(() => {
        dispatch(nowLoadingAction(false));
      });
  };
};

export const createFollowing = (userId) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
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
      })
      .finally(() => {
        dispatch(nowLoadingAction(false));
      });
  };
};

export const destroyFollowing = (userId) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
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
      })
      .finally(() => {
        dispatch(nowLoadingAction(false));
      });
  };
};
