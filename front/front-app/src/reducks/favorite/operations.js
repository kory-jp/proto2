import axios from "axios";
import { push } from "connected-react-router";
import { setFavoriteAction } from "./actions";

export const confirmFavorited = (postId) => {
  return async (dispatch) => {
    axios
      .get(
        `http://localhost:3001/api/v1/user/posts/${postId.id}/favorites/favorited_by`,
        {
          withCredentials: true,
        }
      )
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
    axios
      .post(
        `http://localhost:3001/api/v1/user/posts/${postId.id}/favorites`,

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
    axios
      .delete(
        `http://localhost:3001/api/v1/user/posts/${postId.id}/favorites`,
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
