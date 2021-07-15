import axios from "axios";
import { getTagsAction } from "./actions";

// オプションの選択肢取得
export const getTags = () => {
  return async (dispatch) => {
    axios
      .get("http://localhost:3001/api/v1/user/tags", {
        withCredentials: true,
      })
      .then((response) => {
        const tags = response.data;
        dispatch(getTagsAction(tags));
      })
      .catch((error) => {
        console.log("error res:", error);
      });
  };
};
