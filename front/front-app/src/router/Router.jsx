import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from '../components/auth/Auth'
import LoginPage from '../components/pages/LoginPage'
import PostEdit from '../components/pages/posts/PostEdit'
import PostIndex from '../components/pages/posts/PostIndex'
import PostNew from '../components/pages/posts/PostNew'
import PostShow from '../components/pages/posts/PostShow'
import RegistrationPage from '../components/pages/RegistrationPage'
import DefaultLayout from '../components/templates/DefaultLayout'

export const Router = () => {
  return(
    <Switch>
      <Route  exact path={"/"} component={LoginPage} />
      <Route path={"/registration"} component={RegistrationPage} />
      <Auth>
        <DefaultLayout />
        <Route exact path={"/posts"} component={PostIndex} /> 
        <Route path={"/posts/new"} component={PostNew} />
        <Route path={"/posts/show/:id"} component={PostShow} />
        <Route path={"/posts/edit/:id"} component={PostEdit} />
      </Auth>
    </Switch>
  )
}

export default Router;