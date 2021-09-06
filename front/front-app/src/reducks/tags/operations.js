import axios from "axios";
import { getTagsAction } from "./actions";

// オプションの選択肢取得
export const getTags = () => {
  return async (dispatch) => {
    const apiURL = process.env.REACT_APP_USERS_API_URL + "tags";
    axios
      .get(apiURL, {
        withCredentials: true,
      })
      .then((response) => {
        const tags = response.data.tags;
        dispatch(getTagsAction(tags));
      })
      .catch((error) => {
        console.log("error res:", error);
      });
  };
};
