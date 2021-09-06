import axios from "axios";
import { push } from "connected-react-router";
import { nowLoadingAction } from "../loading/actions";
import { getListPostsAction, setPostAction } from "./actions";

export const getPosts = (setSumPage, queryPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    const apiURL =
      process.env.REACT_APP_USERS_API_URL + `posts/?page=${queryPage}`;
    axios
      .get(apiURL, {
        withCredentials: true,
      })
      .then((response) => {
        const posts = response.data.posts;
        setSumPage(response.data.page_length);
        dispatch(getListPostsAction(posts));
      })
      .catch((error) => {
        console.log("error res:", error);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(nowLoadingAction(false));
        }, 800);
      });
  };
};

export const getCurrentUserPosts = (currentUserId, queryPage, setSumPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    const apiURL =
      process.env.REACT_APP_USERS_API_URL +
      `accounts/${currentUserId.id}/myposts/?page=${queryPage}`;
    axios
      .get(apiURL, { withCredentials: true })
      .then((response) => {
        const posts = response.data.posts;
        const page_length = response.data.page_length;
        setSumPage(page_length);
        dispatch(getListPostsAction(posts));
      })
      .catch((error) => {
        console.log("error res:", error);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(nowLoadingAction(false));
        }, 800);
      });
  };
};

export const getUsersPosts = (userId, setSumPage, queryPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    const apiURL =
      process.env.REACT_APP_USERS_API_URL +
      `users/${userId.id}/posts/?page=${queryPage}`;
    axios
      .get(apiURL, { withCredentials: true })
      .then((response) => {
        const posts = response.data.posts;
        const page_length = response.data.page_length;
        setSumPage(page_length);
        dispatch(getListPostsAction(posts));
      })
      .catch((error) => {
        console.log("error res:", error);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(nowLoadingAction(false));
        }, 800);
      });
  };
};

export const getCurretUserFavoritePosts = (userId, queryPage, setSumPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    const apiURL =
      process.env.REACT_APP_USERS_API_URL +
      `accounts/${userId.id}/favorite_posts/?page=${queryPage}`;
    axios
      .get(apiURL, { withCredentials: true })
      .then((response) => {
        const posts = response.data.posts;
        const page_length = response.data.page_length;
        setSumPage(page_length);
        dispatch(getListPostsAction(posts));
      })
      .catch((error) => {
        console.log("error res:", error);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(nowLoadingAction(false));
        }, 800);
      });
  };
};

export const getUsersFavoritePosts = (userId, queryPage, setSumPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    const apiURL =
      process.env.REACT_APP_USERS_API_URL +
      `users/${userId.id}/favorite_posts/?page=${queryPage}`;
    axios
      .get(apiURL, { withCredentials: true })
      .then((response) => {
        const posts = response.data.posts;
        const page_length = response.data.page_length;
        setSumPage(page_length);
        dispatch(getListPostsAction(posts));
      })
      .catch((error) => {
        console.log("error res:", error);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(nowLoadingAction(false));
        }, 800);
      });
  };
};

export const searchTagGetPosts = (label, setSumPage, queryPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    const apiURL =
      process.env.REACT_APP_USERS_API_URL + `tags/search/?page=${queryPage}`;
    axios
      .post(
        apiURL,
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
        dispatch(getListPostsAction(posts));
      })
      .catch((error) => {
        console.log("error res:", error);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(nowLoadingAction(false));
        }, 800);
      });
  };
};

export const newPost = (formData, showMessage) => {
  return async (dispatch) => {
    const apiURL = process.env.REACT_APP_USERS_API_URL + "posts";
    axios
      .post(
        apiURL,
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
            setPostAction({
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
      });
  };
};

export const showPost = (postId, showMessage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    const apiURL = process.env.REACT_APP_USERS_API_URL + `posts/${postId.id}`;
    axios
      .get(apiURL, {
        withCredentials: true,
      })
      .then((response) => {
        if (!response.data.message) {
          const post = response.data;
          dispatch(
            setPostAction({
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
        } else {
          const res = response.data;
          showMessage({ title: res.message, status: res.status });
          dispatch(push("/posts"));
        }
      })
      .catch((error) => {
        console.log("error:", error);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(nowLoadingAction(false));
        }, 800);
      });
  };
};

export const updatePost = (postId, formData, showMessage) => {
  return async (dispatch) => {
    const apiURL = process.env.REACT_APP_USERS_API_URL + `posts/${postId.id}`;
    axios
      .patch(
        apiURL,
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
            setPostAction({
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
      });
  };
};

export const deletePost = (postId, showMessage) => {
  return async (dispatch) => {
    const apiURL = process.env.REACT_APP_USERS_API_URL + `posts/${postId.id}`;
    axios
      .delete(apiURL, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(
          setPostAction({
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
      });
  };
};
