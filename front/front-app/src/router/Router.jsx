import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from '../components/auth/Auth'
import LoginPage from '../components/pages/LoginPage'
import ProfileEdit from '../components/pages/mypage/ProfileEdit'
import PostEdit from '../components/pages/posts/PostEdit'
import PostIndex from '../components/pages/posts/PostIndex'
import PostNew from '../components/pages/posts/PostNew'
import PostShow from '../components/pages/posts/PostShow'
import RegistrationPage from '../components/pages/RegistrationPage'
import UsersInfo from '../components/pages/users/UsersInfo'
import DefaultLayout from '../components/templates/DefaultLayout'

export const Router = () => {
  return(
    <Switch>
      <Route  exact path={"/"} component={LoginPage} />
      <Route path={"/registration"} component={RegistrationPage} />
      <Auth>
        <DefaultLayout>
          <Route exact path={"/posts"} component={PostIndex} /> 
          <Route path={"/posts/new"} component={PostNew} />
          <Route path={"/posts/show/:id"} component={PostShow} />
          <Route path={"/posts/edit/:id"} component={PostEdit} />
          <Route path={"/mypage/edit/:id"} component={ProfileEdit} />
          <Route path={"/users/:id"} component={UsersInfo} />
        </DefaultLayout>
      </Auth>
    </Switch>
  )
}

export default Router;