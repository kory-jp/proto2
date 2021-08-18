import axios from "axios";
import { push } from "connected-react-router";
import { getCommentsAction, setCommentAction } from "./actions";

export const getComments = (postId, setSumPage, queryPage) => {
  return async (dispatch) => {
    axios
      .get(
        `http://localhost:3001/api/v1/user/posts/${postId.id}/comments?page=${queryPage}`,
        { withCredentials: true }
      )
      .then((response) => {
        if (!response.data.message) {
          const comments = response.data.comments;
          const page_length = response.data.page_length;
          dispatch(getCommentsAction(comments));
          setSumPage(page_length);
        } else {
          dispatch(push("/posts"));
        }
      })
      .catch((error) => {
        console.log("error res:", error);
      });
  };
};

export const newComment = (showMessage, postId, currentUserId, comment) => {
  return async (dispatch) => {
    await axios
      .post(
        `http://localhost:3001/api/v1/user/posts/${postId.id}/comments`,
        {
          comment: {
            post_id: postId,
            user_id: currentUserId,
            comment: comment,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        const comment = response.data;
        dispatch(
          setCommentAction({
            id: comment.id,
            postId: comment.post_id,
            userId: comment.user_id,
            comments: comment.comments,
          })
        );
        showMessage({ title: "コメント投稿しました", status: "success" });
        dispatch(push(`/posts/show/${postId}`));
      })
      .catch(() => {
        dispatch(console.log("error"));
      });
  };
};

export const editComments = (commentId) => {
  return async (dispatch) => {
    axios
      .get(`http://localhost:3001/api/v1/user/comments/${commentId}/edit`, {
        withCredentials: true,
      })
      .then((response) => {
        const comments = response.data.comments;
        dispatch(setCommentAction(comments));
      })
      .catch((error) => {
        console.log("error res:", error);
      });
  };
};

export const updateComment = (commentData, comment, showMessage, returnTop) => {
  return async (dispatch) => {
    axios
      .patch(
        `http://localhost:3001/api/v1/user/comments/${commentData.id}`,
        {
          comment: {
            post_id: commentData.post_id,
            user_id: commentData.user_id,
            comment: comment,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        const comment = response.data;
        if (comment) {
          dispatch(
            setCommentAction({
              id: comment.id,
              postId: comment.post_id,
              user_id: comment.user_id,
              comment: comment.comment,
            })
          );
          showMessage({ title: "編集完了しました", status: "success" });
          dispatch(push(`/posts/show/${commentData.post_id}`));
          returnTop();
        } else {
          showMessage({ title: "編集に失敗しました", status: "error" });
        }
      })
      .catch((error) => {
        console.log("post res:", error);
      });
  };
};

export const deleteComment = (commentData, postId, showMessage) => {
  return async (dispatch) => {
    axios
      .delete(`http://localhost:3001/api/v1/user/comments/${commentData.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(
          setCommentAction({
            id: "",
            post_id: "",
            user_id: "",
            comment: "",
          })
        );
        showMessage({ title: "削除完了しました", status: "success" });
        dispatch(push(`/posts/show/${postId}`));
      })
      .catch((error) => {
        console.log("post res:", error);
      });
  };
};
