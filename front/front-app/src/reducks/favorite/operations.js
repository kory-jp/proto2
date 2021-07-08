import axios from "axios";
import { nowLoadingAction } from "../loading/actions";
import {
  confirmFavoritedAction,
  createFavoriteAction,
  destroyFavoriteAction,
} from "./actions";

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
        const status = response.data;
        dispatch(
          confirmFavoritedAction({
            status: status,
          })
        );
      })
      .catch((error) => {
        console.log("error res:", error);
      });
  };
};

// export const createFavorite = (postId) => {
//   console.log("2");
//   console.log(postId);
//   return async (dispatch) => {
//     axios
//       .post(`http://localhost:3001/api/v1/user/posts/${postId.id}/favorites`, {
//         withCredentials: true,
//       })
//       .then((response) => {
//         console.log(response);
//         console.log("3");
//         const status = response.data;
//         dispatch(
//           confirmFavoritedAction({
//             status: status,
//           })
//         );
//       })
//       .catch((error) => {
//         console.log("error res:", error);
//       });
//   };
// };

export const createFavorite = (postId, currentUserId) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
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
        console.log(response);
        console.log("3");
        const status = response.data;
        dispatch(
          createFavoriteAction({
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

export const destroyFavorite = (postId) => {
  console.log(postId);
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
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
          destroyFavoriteAction({
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
