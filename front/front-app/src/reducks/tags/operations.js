import axios from "axios";
import { getTagAction, getTagsAction } from "./actions";

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

export const getTag = (tagId) => {
  return async (dispatch) => {
    axios
      .get(`http://localhost:3001/api/v1/user/tags/${tagId.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        const tag = response.data;
        dispatch(getTagAction(tag));
      })
      .catch((error) => {
        console.log("error res:", error);
      });
  };
};
