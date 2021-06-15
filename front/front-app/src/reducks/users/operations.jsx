import axios from 'axios'
import {push} from 'connected-react-router';
import { notLoadingAction, nowLoadingAction } from '../loading/actions';
import { logInAction, registrationAction, logOutAction } from './actions';


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
    console.log("registration res", response)
    if (response.data.status === "created") {
      const userData = response.data

      dispatch(
        registrationAction({
          logged_in: true,
          id: userData.user.id,
          name: userData.user.name, 
          email: userData.user.email,
          password: userData.user.password_digest,
        })
      )
      console.log('1')
      showMessage({title: '新規登録しました', status: 'success'})
      dispatch(push('/dashboard'))
    } else {
      console.log('2')
      showMessage({title: '新規登録に失敗しました', status: 'error'})
    }
  }).catch(error => {
    console.log("registration error", error)
  })
  .finally(()=> {
    dispatch(notLoadingAction(false))
  })
 }
}

export const logIn = (email, password, showMessage) => {
  return async (dispatch, getState) => {
    dispatch(nowLoadingAction(true))
    const state = getState();
    const logged_in = state.users.logged_in

    if (email === "" || password === "" ) {
      alert("必須項目が空欄です。")
      return false;
    };

    if(!logged_in) {
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
        if (response.data.logged_in) {
          const userData = response.data

          dispatch(
            logInAction({
              logged_in: userData.logged_in,
              id: userData.user.id,
              name: userData.user.name, 
              email: userData.user.email,
              password: userData.user.password_digest
            })
          )
          showMessage({title: "ログインしました", status: "success"})
          dispatch(push('/dashboard'))
        }
        else{
          showMessage({title: "ユーザーが見つかりません", status: "error"})
        }
      })
      .catch((response)=> {
        console.log('ERROR');
      })
      .finally(()=> {
        dispatch(notLoadingAction(false))
      })
    }
  }
}

export const logOut = (showMessage) => {
  return async (dispatch, getState) => {
    const state = getState();
    const logged_in = state.users.logged_in

    if(logged_in) {
      await axios
      .delete("http://localhost:3001/api/v1/user/logout", { withCredentials: true}
      ).then(response => {
        dispatch(
          logOutAction({
            logged_in: false,
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
}

// ログインをしている場合はユーザー情報を返し、未ログインの場合はログインページに飛ばす
export const loggedInStatus = () => {
  return async (dispatch) => {

    await axios
    .get("http://localhost:3001/api/v1/user/logged_in", 
    {withCredentials: true},
    )
    .then(response => {
      console.log("ログイン状況:", response)
      if (response.data.logged_in) {
        const userData = response.data
        dispatch(
          logInAction({
            logged_in: userData.logged_in,
            id: userData.user.id,
            name: userData.user.name, 
            email: userData.user.email,
            password: userData.user.password_digest
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

// ログイン済みユーザーをdashboardへ遷移させる
export const completedLoggedInStatus = () => {
  return async (dispatch) => {

    await axios
    .get("http://localhost:3001/api/v1/user/logged_in", 
    {withCredentials: true},
    )
    .then(response => {
      console.log("ログイン状況:", response)
      if (response.data.logged_in) {
        dispatch(push('/dashboard'))
      }
    }).catch(error => {
      console.log("ログインエラー:", error)
    })
  }
}