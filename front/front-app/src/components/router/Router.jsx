import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'

export const Router = () => {
  return(
    <Switch>
      <Route exact path={"/"}>
        <Home/>
      </Route>
      <Route exact path={"/dashboard"}>
        <Dashboard/>
      </Route>
    </Switch>
  )
}

export default Router;