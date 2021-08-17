import axios from "axios";
import { push } from "connected-react-router";
import { nowLoadingAction } from "../loading/actions";
import { getListPostsAction, setPostAction } from "./actions";

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
    axios
      .get(
        `http://localhost:3001/api/v1/user/accounts/${currentUserId.id}/myposts/?page=${queryPage}`,
        { withCredentials: true }
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
    axios
      .get(
        `http://localhost:3001/api/v1/user/accounts/${userId.id}/favorite_posts/?page=${queryPage}`,
        { withCredentials: true }
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

export const getUsersFavoritePosts = (userId, queryPage, setSumPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    axios
      .get(
        `http://localhost:3001/api/v1/user/users/${userId.id}/favorite_posts/?page=${queryPage}`,
        { withCredentials: true }
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
    axios
      .get(`http://localhost:3001/api/v1/user/posts/${postId.id}`, {
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
    axios
      .delete(`http://localhost:3001/api/v1/user/posts/${postId.id}`, {
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
