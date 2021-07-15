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
      </DefaultFlex>
      <Switch>
        <Route exact path={"/users/:id"} component={UsersPosts}/>
        <Route exact path={"/users/:id/favoritePosts"} component={UsersFavoritePosts}/>
      </Switch>
    </Box>
  )
}

export default UsersInfo;