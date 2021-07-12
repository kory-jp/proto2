import axios from "axios";
import { push } from "connected-react-router";
import { nowLoadingAction } from "../loading/actions";
import {
  deletePostAction,
  getPostsAction,
  getUsersPostsAction,
  newPostAction,
  showPostAction,
  updatePostAction,
} from "./actions";

export const getPosts = (setSumPage, queryPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    axios
      .get(`http://localhost:3001/api/v1/user/posts/?page=${queryPage}`, {
        withCredentials: true,
      })
      .then((response) => {
        const posts = response.data.posts;
        setSumPage(response.data.page_length);
        dispatch(getPostsAction(posts));
      })
      .catch((error) => {
        console.log("error res:", error);
      })
      .finally(() => {
        dispatch(nowLoadingAction(false));
      });
  };
};

export const getCurrentUserPosts = (currentUserId, queryPage, setSumPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    axios
      .get(
        `http://localhost:3001/api/v1/user/accounts/${currentUserId.id}/myposts/?page=${queryPage}`,
        { withCredentials: true }
      )
      .then((response) => {
        const posts = response.data.posts;
        const page_length = response.data.page_length;
        setSumPage(page_length);
        dispatch(getUsersPostsAction(posts));
      })
      .catch((error) => {
        console.log("error res:", error);
      })
      .finally(() => {
        dispatch(nowLoadingAction(false));
      });
  };
};

export const getUsersPosts = (userId, setSumPage, queryPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    axios
      .get(
        `http://localhost:3001/api/v1/user/users/${userId.id}/posts/?page=${queryPage}`,
        { withCredentials: true }
      )
      .then((response) => {
        const posts = response.data.posts;
        const page_length = response.data.page_length;
        setSumPage(page_length);
        dispatch(getUsersPostsAction(posts));
      })
      .catch((error) => {
        console.log("error res:", error);
      })
      .finally(() => {
        dispatch(nowLoadingAction(false));
      });
  };
};

export const searchTagGetPosts = (label, setSumPage, queryPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    axios
      .post(
        `http://localhost:3001/api/v1/user/tags/search/?page=${queryPage}`,
        {
          tag: {
            label: label,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const posts = response.data.posts;
        const page_length = response.data.page_length;
        setSumPage(page_length);
        dispatch(getUsersPostsAction(posts));
      })
      .catch((error) => {
        console.log("error res:", error);
      })
      .finally(() => {
        dispatch(nowLoadingAction(false));
      });
  };
};

export const newPost = (formData, showMessage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    axios
      .post(
        "http://localhost:3001/api/v1/user/posts",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        const post = response.data;
        if (post) {
          dispatch(
            newPostAction({
              id: post.id,
              user_id: post.user_id,
              title: post.title,
              content: post.content,
              image: post.image,
            })
          );
          showMessage({ title: "投稿完了しました", status: "success" });
          dispatch(push("/posts"));
        } else {
          showMessage({ title: "投稿に失敗しました", status: "error" });
        }
      })
      .catch((error) => {
        console.log("post res:", error);
      })
      .finally(() => {
        dispatch(nowLoadingAction(false));
      });
  };
};

export const showPost = (postId) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    axios
      .get(`http://localhost:3001/api/v1/user/posts/${postId.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        const post = response.data;
        dispatch(
          showPostAction({
            id: post.id,
            user_id: post.user_id,
            name: post.name,
            nickname: post.nickname,
            userIcon: post.user_icon.url,
            title: post.title,
            content: post.content,
            image: post.image.url,
            created_at: post.created_at,
            tags: post.tags,
          })
        );
      })
      .catch((error) => {
        console.log("error:", error);
      })
      .finally(() => {
        dispatch(nowLoadingAction(false));
      });
  };
};

export const updatePost = (postId, formData, showMessage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    axios
      .patch(
        `http://localhost:3001/api/v1/user/posts/${postId.id}`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        const post = response.data;
        if (post) {
          dispatch(
            updatePostAction({
              id: post.id,
              user_id: post.user_id,
              title: post.title,
              content: post.content,
              image: post.image,
            })
          );
          showMessage({ title: "編集完了しました", status: "success" });
          dispatch(push("/posts"));
        } else {
          showMessage({ title: "編集に失敗しました", status: "error" });
        }
      })
      .catch((error) => {
        console.log("post res:", error);
      })
      .finally(() => {
        dispatch(nowLoadingAction(false));
      });
  };
};

export const deletePost = (postId, showMessage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    axios
      .delete(`http://localhost:3001/api/v1/user/posts/${postId.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(
          deletePostAction({
            id: "",
            user_id: "",
            title: "",
            content: "",
            image: "",
          })
        );
        showMessage({ title: "削除完了しました", status: "success" });
        dispatch(push("/posts"));
      })
      .catch((error) => {
        console.log("post res:", error);
      })
      .finally(() => {
        dispatch(nowLoadingAction(false));
      });
  };
};
