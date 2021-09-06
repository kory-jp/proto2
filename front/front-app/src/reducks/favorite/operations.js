import axios from "axios";
import { push } from "connected-react-router";
import { setFavoriteAction } from "./actions";

export const confirmFavorited = (postId) => {
  return async (dispatch) => {
    const apiURL =
      process.env.REACT_APP_USERS_API_URL +
      `posts/${postId.id}/favorites/favorited_by`;
    axios
      .get(apiURL, {
        withCredentials: true,
      })
      .then((response) => {
        if (!response.data.message) {
          const status = response.data;
          dispatch(
            setFavoriteAction({
              status: status,
            })
          );
        } else {
          dispatch(push("/posts"));
        }
      })
      .catch((error) => {
        console.log("error res:", error);
      });
  };
};

export const createFavorite = (postId, currentUserId) => {
  return async (dispatch) => {
    const apiURL =
      process.env.REACT_APP_USERS_API_URL + `posts/${postId.id}/favorites`;
    axios
      .post(
        apiURL,
        {
          favorites: {
            user_id: currentUserId,
            post_id: postId.id,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const status = response.data;
        dispatch(
          setFavoriteAction({
            status: status,
          })
        );
      })
      .catch((error) => {
        console.log("error res:", error);
      });
  };
};

export const destroyFavorite = (postId) => {
  return async (dispatch) => {
    const apiURL =
      process.env.REACT_APP_USERS_API_URL + `posts/${postId.id}/favorites`;
    axios
      .delete(apiURL, {
        withCredentials: true,
      })
      .then((response) => {
        const status = response.data;
        dispatch(
          setFavoriteAction({
            status: status,
          })
        );
      })
      .catch((error) => {
        console.log("error res:", error);
      });
  };
};
