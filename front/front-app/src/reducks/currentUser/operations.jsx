import axios from 'axios'
import {push} from 'connected-react-router';
import { nowLoadingAction } from '../loading/actions';
import { logInAction, registrationAction, logOutAction, updateCurrentUserAction } from './actions';


export const registration = (userName, email, password, passwordConfirmation, showMessage) => {
 return async (dispatch) => {

  if (userName === "" || email === "" || password === "" || passwordConfirmation === "") {
    alert("必須項目が未入力です")
    return false;
  };

  if (password !== passwordConfirmation) {
    alert("パスワードが一致していません") 
    return false
  };
  dispatch(nowLoadingAction(true))

  axios
    .post("http://localhost:3001/api/v1/user/signup", 
      {
        user: {
          name: userName,
          email: email,
          password: password,
          passwordConfirmation: passwordConfirmation
        }
      },
      {withCredentials: true}
  ).then(response => {
    if (response.data) {
      const userData = response.data
      dispatch(
        registrationAction({
          id: userData.id,
          name: userData.name, 
          email: userData.email,
          password: userData.password_digest,
        })
      )
      showMessage({title: '新規登録しました', status: 'success'})
      dispatch(push('/posts'))
    } else {
      showMessage({title: '新規登録に失敗しました', status: 'error'})
    }
  }).catch(error => {
    console.log("registration error", error)
  })
  .finally(()=> {
    dispatch(nowLoadingAction(false))
  })
 }
}

export const logIn = (email, password, showMessage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true))
      await axios
      .post('http://localhost:3001/api/v1/user/login', 
      {
        user: {
          email: email,
          password: password,
        }
      },
      {withCredentials: true},
      ).then(response => {
        if (response.data) {
          const userData = response.data
          dispatch(
            logInAction({
              id: userData.id,
              name: userData.name, 
              nickname: userData.nickname,
              email: userData.email,
              introduction: userData.introduction,
              image: userData.image,
              password: userData.password_digest
            })
          )
          showMessage({title: "ログインしました", status: "success"})
          dispatch(push('/posts'))
        }
        else{
          showMessage({title: "ユーザーが見つかりません", status: "error"})
        }
      })
      .catch((response)=> {
        console.log('ERROR');
      })
      .finally(()=> {
        dispatch(nowLoadingAction(false))
      })
    }
  }
// }

export const logOut = (showMessage) => {
  return async (dispatch, getState) => {
      await axios
      .delete("http://localhost:3001/api/v1/user/logout", { withCredentials: true}
      ).then(response => {
        dispatch(
          logOutAction({
            id: "",
            name: "", 
            email: "",
            password: ""
          })
        )
        showMessage({title: 'ログアウトしました', status: 'success'})
        dispatch(push('/'))
      })
      .catch(()=> {
        dispatch(console.log('error'))
      })
    }
  }
// }

// ログインをしている場合はユーザー情報を返し、未ログインの場合はログインページに飛ばす
export const loggedInStatus = () => {
  return async (dispatch) => {

    await axios
    .get("http://localhost:3001/api/v1/user/logged_in", 
    {withCredentials: true},
    )
    .then(response => {
      if (response.data) {
        const userData = response.data
        dispatch(
          logInAction({
            id: userData.id,
            name: userData.name, 
            nickname: userData.nickname,
            email: userData.email,
            introduction: userData.introduction,
            image: userData.image,
            password: userData.password_digest
          })
        )
      } else {
        dispatch(push('/'))
      }
    }).catch(error => {
      console.log("ログインエラー:", error)
    })
  }
}

// ログイン済みユーザーを一覧ページへ遷移させる
export const completedLoggedInStatus = () => {
  return async (dispatch) => {

    await axios
    .get("http://localhost:3001/api/v1/user/logged_in", 
    {withCredentials: true},
    )
    .then(response => {
      if (response.data) {
        dispatch(push('/posts'))
      }
    }).catch(error => {
      console.log("ログインエラー:", error)
    })
  }
}

// 個人情報訂正
export const updateCurrentUser = (userId, formData, showMessage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true))
    axios
      .patch(`http://localhost:3001/api/v1/user/accounts/${userId.id}`,
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data'
          }
        },
        {withCredentials: true}
      ).then(response => {
        const user = response.data
        dispatch(
          updateCurrentUserAction({
            name: user.name,
            nickname: user.nickname,
            email: user.email,
            introduction: user.introduction,
            image: user.image
          })
        )
        showMessage({title: '個人情報を修正しました', status: 'success'})
        dispatch(push('/posts'))
      }).catch(error => {
        console.log("post res:", error)
      }).finally(() => {
        dispatch(nowLoadingAction(false))
      })
  }
}