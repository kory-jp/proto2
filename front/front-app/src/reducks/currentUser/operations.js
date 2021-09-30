import axios from "axios";
import { push } from "connected-react-router";
import { nowLoadingAction } from "../loading/actions";
import { setCurrentUserAction } from "./actions";

export const registration = (
  userName,
  userNickname,
  email,
  password,
  passwordConfirmation,
  showMessage
) => {
  return async (dispatch) => {
    if (
      userName === "" ||
      userNickname === "" ||
      email === "" ||
      password === "" ||
      passwordConfirmation === ""
    ) {
      showMessage({ title: "必須項目が未入力です", status: "error" });
      return false;
    }

    if (password !== passwordConfirmation) {
      showMessage({ title: "パスワードが一致しておりません", status: "error" });
      return false;
    }
    dispatch(nowLoadingAction(true));
    const apiURL = process.env.REACT_APP_USERS_API_URL + "signup";

    axios
      .post(
        apiURL,
        {
          user: {
            name: userName,
            nickname: userNickname,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data) {
          const userData = response.data;
          dispatch(
            setCurrentUserAction({
              id: userData.id,
              name: userData.name,
              nickname: userData.nickname,
              email: userData.email,
            })
          );
          showMessage({ title: "新規登録しました", status: "success" });
          dispatch(push("/posts"));
        } else {
          showMessage({ title: "新規登録に失敗しました", status: "error" });
        }
      })
      .catch((error) => {
        console.log("registration error", error);
      })
      .finally(() => {
        dispatch(nowLoadingAction(false));
      });
  };
};

export const logIn = (email, password, showMessage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    const apiURL = process.env.REACT_APP_USERS_API_URL + "login";
    await axios
      .post(
        apiURL,
        {
          user: {
            email: email,
            password: password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.message) {
          showMessage({ title: response.data.message, status: "error" });
        } else {
          const userData = response.data;
          dispatch(
            setCurrentUserAction({
              id: userData.id,
              name: userData.name,
              nickname: userData.nickname,
              email: userData.email,
              introduction: userData.introduction,
              image: userData.image,
            })
          );
          showMessage({ title: "ログインしました", status: "success" });
          dispatch(push("/posts"));
        }
      })
      .catch((response) => {
        console.log("ERROR");
      })
      .finally(() => {
        dispatch(nowLoadingAction(false));
      });
  };
};

export const loginGuestUser = (showMessage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    const apiURL = process.env.REACT_APP_USERS_API_URL + "login";
    await axios
      .post(
        apiURL,
        {
          user: {
            email: "guest-user@example.com",
            password: "guestpassword",
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.message) {
          showMessage({ title: response.data.message, status: "error" });
        } else {
          const userData = response.data;
          dispatch(
            setCurrentUserAction({
              id: userData.id,
              name: userData.name,
              nickname: userData.nickname,
              email: userData.email,
              introduction: userData.introduction,
              image: userData.image,
            })
          );
          showMessage({ title: "ログインしました", status: "success" });
          dispatch(push("/posts"));
        }
      })
      .catch((response) => {
        console.log("ERROR");
      })
      .finally(() => {
        dispatch(nowLoadingAction(false));
      });
  };
};

export const logOut = (showMessage) => {
  return async (dispatch, getState) => {
    const apiURL = process.env.REACT_APP_USERS_API_URL + "logout";
    await axios
      .delete(apiURL, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(
          setCurrentUserAction({
            id: "",
            name: "",
            email: "",
            password: "",
          })
        );
        showMessage({ title: "ログアウトしました", status: "success" });
        dispatch(push("/"));
      })
      .catch(() => {
        dispatch(console.log("error"));
      });
  };
};

// ログインをしている場合はユーザー情報を返し、未ログインの場合はログインページに飛ばす
export const loggedInStatus = (showMessage) => {
  return async (dispatch) => {
    const apiURL = process.env.REACT_APP_USERS_API_URL + "logged_in";
    await axios
      .get(apiURL, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.message) {
          showMessage({ title: response.data.message, status: "error" });
          dispatch(setCurrentUserAction([]));
          dispatch(push("/"));
        } else {
          const userData = response.data;
          dispatch(
            setCurrentUserAction({
              id: userData.id,
              name: userData.name,
              nickname: userData.nickname,
              email: userData.email,
              introduction: userData.introduction,
              image: userData.image,
              password: userData.password_digest,
            })
          );
        }
      })
      .catch((error) => {
        console.log("ログインエラー:", error);
      });
  };
};

// ログイン済みユーザーを一覧ページへ遷移させる
export const completedLoggedInStatus = () => {
  return async (dispatch) => {
    const apiURL = process.env.REACT_APP_USERS_API_URL + "logged_in";
    await axios
      .get(apiURL, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.id) {
          dispatch(push("/posts"));
        }
      })
      .catch((error) => {
        console.log("ログインエラー:", error);
      });
  };
};

// 個人情報訂正
export const updateCurrentUser = (formData, showMessage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    const apiURL = process.env.REACT_APP_USERS_API_URL + "accounts";
    axios
      .patch(apiURL, formData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.message) {
          showMessage({ title: response.data.message, status: "error" });
        } else {
          const user = response.data;
          dispatch(
            setCurrentUserAction({
              name: user.name,
              nickname: user.nickname,
              email: user.email,
              introduction: user.introduction,
              image: user.image.url,
            })
          );
          showMessage({ title: "個人情報を修正しました", status: "success" });
          dispatch(push("/posts"));
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

// パスワード変更
export const changePassword = (
  showMessage,
  previousPassword,
  password,
  passwordConfirmation
) => {
  return async (dispatch) => {
    if (password !== passwordConfirmation) {
      showMessage({
        title: "パスワードと確認用パスワードが一致しておりません",
        status: "error",
      });
      return false;
    }
    dispatch(nowLoadingAction(true));
    const apiURL = process.env.REACT_APP_USERS_API_URL + "accounts/password";
    await axios
      .post(
        apiURL,
        {
          user: {
            previous_password: previousPassword,
            password: password,
            password_confirmation: passwordConfirmation,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.message) {
          showMessage({ title: response.data.message, status: "error" });
        } else {
          dispatch(setCurrentUserAction(response.data));
          showMessage({
            title: "パスワードの変更に成功しました",
            status: "success",
          });
          dispatch(push("/posts"));
        }
      })
      .catch((response) => {
        console.log("ERROR");
      })
      .finally(() => {
        dispatch(nowLoadingAction(false));
      });
  };
};

// アカウント削除
export const deleteAccount = (password, showMessage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    const apiURL = process.env.REACT_APP_USERS_API_URL + "accounts";
    await axios
      .post(
        apiURL,
        {
          user: {
            password: password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data === "ok") {
          dispatch(setCurrentUserAction([]));
          showMessage({
            title: "アカウントの削除に成功しました",
            status: "success",
          });
          dispatch(push("/registration"));
        } else {
          showMessage({ title: "パスワードが一致しません", status: "error" });
        }
      })
      .catch((response) => {
        console.log("ERROR");
      })
      .finally(() => {
        dispatch(nowLoadingAction(false));
      });
  };
};
