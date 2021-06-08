import axios from 'axios'
import {push} from 'connected-react-router';
import { logInAction, registrationAction, logOutAction } from './actions';

export const registration = (userName, email, password, passwordConfirmation) => {
 return async (dispatch) => {

  if (userName === "" || email === "" || password === "" || passwordConfirmation === "") {
    alert("必須項目が未入力です")
    return false;
  };

  if (password !== passwordConfirmation) {
    alert("パスワードが一致していません") 
    return false
  };

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
      console.log(userData)

      dispatch(
        registrationAction({
          logged_in: true,
          id: userData.user.id,
          name: userData.user.name, 
          email: userData.user.email,
          password: userData.user.password_digest,
        })
      )
      dispatch(push('/dashboard'))
    }
  }).catch(error => {
    console.log("registration error", error)
  })
 }
}

export const logIn = (email, password) => {
  return async (dispatch, getState) => {
    const state = getState();
    const logged_in = state.users.logged_in

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
          console.log(userData)

          dispatch(
            logInAction({
              logged_in: userData.logged_in,
              id: userData.user.id,
              name: userData.user.name, 
              email: userData.user.email,
              password: userData.user.password_digest
            })
          )
          dispatch(push('/dashboard'))
        }
      })
      .catch(()=> {
        dispatch(console.log('error'))
      })
    }
  }
}

export const logOut = () => {
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

    console.log('実行')
    await axios
    .get("http://localhost:3001/api/v1/user/logged_in", 
    {withCredentials: true},
    {headers: {'X-Requested-With': 'XMLHttpRequest'}}
    )
    .then(response => {
      console.log("ログイン状況:", response)
      if (response.data.logged_in) {
        console.log(true)
        const userData = response.data
        console.log(userData)
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