import axios from "axios";
import { nowLoadingAction } from "../loading/actions";
import { getTagsAction } from "./actions";

export const getTags = () => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
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
      })
      .finally(() => {
        dispatch(nowLoadingAction(false));
      });
  };
};
