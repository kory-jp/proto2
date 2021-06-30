import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Center } from '@chakra-ui/layout';
import { Spinner } from "@chakra-ui/spinner";
import useLoadingState from "../../../hooks/useLoadingState";
import { showUsers } from "../../../reducks/users/operations";
import UsersShowCard from "../../organisms/users/UsersShowCard";
import UsersPosts from "./UsersPosts";
import { Box } from "@chakra-ui/react";
import { getUsersPosts } from "../../../reducks/posts/operations";
import usePagination from "../../../hooks/usePagination";

export const UsersInfo = () => {
  const userId = useParams();
  const dispatch = useDispatch()
  const loadingState = useLoadingState()
  const {queryPage, sumPage, setSumPage} = usePagination()

  useEffect(()=> {
    dispatch(showUsers(userId))
    dispatch(getUsersPosts(userId, setSumPage, queryPage))
  },[dispatch, userId, setSumPage, queryPage])
  
  const users =  useSelector((state)=> state.users)
  const posts =  useSelector((state)=> state.posts)
  
  return(
    <>
    { loadingState? (
      <Center  h="100vh" w={{base: "50vh", md: "100vh"}}>
        <Spinner/>
      </Center>
    ): (
      <Box>
        <Box mb="5">
          <UsersShowCard users={users}/>
        </Box>
        <UsersPosts posts={posts} userId={userId} sumPage={sumPage}/>
      </Box>
    )}
  </>
  )
}

export default UsersInfo;