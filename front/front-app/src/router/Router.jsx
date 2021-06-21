import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from '../components/auth/Auth'
import Dashboard from '../components/pages/Dashboard'
import LoginPage from '../components/pages/LoginPage'
import RegistrationPage from '../components/pages/RegistrationPage'

export const Router = () => {
  return(
    <Switch>
      <Route  exact path={"/"}>
        <LoginPage />
      </Route>
      <Route path={"/registration"}>
        <RegistrationPage />
      </Route>
      <Auth>
        <Route path={"/dashboard"}>
          <Dashboard/>
        </Route>
      </Auth>
    </Switch>
  )
}

export default Router;