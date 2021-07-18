import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Switch, Route } from 'react-router-dom'
import UsersShowCard from "../../organisms/users/UsersShowCard";
import UsersPosts from "./UsersPosts";
import { Box } from "@chakra-ui/react";
import { DefaultFlex, UsersPageButton } from '../../../assets/style/chakraStyles'
import UsersFavoritePosts from "./UsersFavoritePosts";
import { push } from "connected-react-router";
import useReturnTop from "../../../hooks/useReturnTop";
import { nowLoadingAction } from "../../../reducks/loading/actions";
import UsersFollows from "./UsersFollows";
import UsersFollowers from "./UsersFollowers";

export const UsersInfo = () => {
  const userId = useParams();
  const dispatch = useDispatch()
  const returnTop = useReturnTop()

  const toUsersPost = useCallback(()=> {
    dispatch(push(`/users/${userId.id}`))
    dispatch(nowLoadingAction(true));
    returnTop();
  },[dispatch, returnTop, userId.id])

  const toFavoritePosts = useCallback(()=> {
    dispatch(push(`/users/${userId.id}/favoritePosts`))
    dispatch(nowLoadingAction(true));
    returnTop();
  },[dispatch, returnTop, userId.id])

  const toUsersFollows = useCallback(()=> {
    dispatch(push(`/users/${userId.id}/follows`))
    dispatch(nowLoadingAction(true));
    returnTop();
  },[dispatch, returnTop, userId])

  const toUsersFollowers = useCallback(()=> {
    dispatch(push(`/users/${userId.id}/followers`))
    dispatch(nowLoadingAction(true));
    returnTop();
  },[dispatch, returnTop, userId])
  
  return(
    <Box>
      <Box mb="5">
        <UsersShowCard/>
      </Box>
      <DefaultFlex
        mb="4"
        justifyContent="space-around"
      >
          <UsersPageButton
            onClick={toUsersPost}
          >
            投稿記事
          </UsersPageButton>
          <UsersPageButton
            onClick={toFavoritePosts}
          >
            高評価記事
          </UsersPageButton>
          <UsersPageButton
            onClick={toUsersFollows}
          >
            フォロー
          </UsersPageButton>
          <UsersPageButton
            onClick={toUsersFollowers}
          >
            フォロワー
          </UsersPageButton>
      </DefaultFlex>
      <Switch>
        <Route exact path={"/users/:id"} component={UsersPosts}/>
        <Route path={"/users/:id/favoritePosts"} component={UsersFavoritePosts}/>
        <Route path={"/users/:id/follows"} component={UsersFollows}/>
        <Route path={"/users/:id/followers"} component={UsersFollowers}/>
      </Switch>
    </Box>
  )
}

export default UsersInfo;