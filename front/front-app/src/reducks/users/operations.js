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
            userIcon: user.image_data.url,
          })
        );
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };
};

export const getFollows = () => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    axios
      .get("http://localhost:3001/api/v1/user/accounts/follows", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        const follows = response.data;
        dispatch(getUsersAction(follows));
      })
      .catch((error) => {
        console.log("error:", error);
      })
      .finally(() => {
        dispatch(nowLoadingAction(false));
      });
  };
};

// export const getFollows = () => {
//   return async (dispatch) => {
//     dispatch(nowLoadingAction(true));
//     axios
//       .get("http://localhost:3001/api/v1/user/accounts/follows", {
//         withCredentials: true,
//       })
//       .then((response) => {
//         console.log(response);
//         const follows = response.data;
//         dispatch(getUsersAction(follows));
//       })
//       .catch((error) => {
//         console.log("error:", error);
//       })
//       .finally(() => {
//         dispatch(nowLoadingAction(false));
//       });
//   };
// };
