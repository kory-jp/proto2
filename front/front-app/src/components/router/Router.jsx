import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from '../auth/Auth'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'

export const Router = () => {
  return(
    <Switch>
      <Auth>
        <Route exact path={"/"}>
          <Home/>
        </Route>
        <Route exact path={"/dashboard"}>
          <Dashboard/>
        </Route>
      </Auth>
    </Switch>
  )
}

export default Router;