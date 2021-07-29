import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from '../components/auth/Auth'
import LoginPage from '../components/pages/LoginPage'
import MyPosts from '../components/pages/mypage/MyPosts'
import ProfileEdit from '../components/pages/mypage/ProfileEdit'
import PostEdit from '../components/pages/posts/PostEdit'
import PostIndex from '../components/pages/posts/PostIndex'
import PostTagSearchIndex from '../components/pages/posts/PostTagSearchIndex'
import PostNew from '../components/pages/posts/PostNew'
import PostShow from '../components/pages/posts/PostShow'
import RegistrationPage from '../components/pages/RegistrationPage'
import UsersInfo from '../components/pages/users/UsersInfo'
import DefaultLayout from '../components/templates/DefaultLayout'
import FavoritePosts from '../components/pages/mypage/FavoritePosts'
import Follows from '../components/pages/mypage/Follows'
import Followers from '../components/pages/mypage/Followers'
import SearchResult from '../components/pages/SearchResult'
import Room from '../components/pages/Room'

export const Router = () => {
  return(
    <Switch>
      <Route  exact path={"/"} component={LoginPage} />
      <Route path={"/registration"} component={RegistrationPage} />
      <Auth>
        <DefaultLayout>
          <Route exact path={"/posts"} component={PostIndex} /> 
          <Route exact path={"/posts/tag"} component={PostTagSearchIndex} /> 
          <Route path={"/posts/new"} component={PostNew} />
          <Route path={"/posts/show/:id"} component={PostShow} />
          <Route path={"/posts/edit/:id"} component={PostEdit} />
          <Route path={"/mypage/:id/edit"} component={ProfileEdit} />
          <Route path={"/mypage/:id/posts"} component={MyPosts} />
          <Route path={"/mypage/:id/follows"} component={Follows} />
          <Route path={"/mypage/:id/followers"} component={Followers} />
          <Route path={"/mypage/:id/favoritePosts"} component={FavoritePosts} />
          <Route path={"/searchResult"} component={SearchResult} />
          <Route path={"/room/:id"} component={Room} />
          <Route path={"/users/:id"} component={UsersInfo} />
        </DefaultLayout>
      </Auth>
    </Switch>
  )
}

export default Router;