import { Box, Center } from '@chakra-ui/layout';
import { Spinner } from "@chakra-ui/spinner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {push} from 'connected-react-router';

import useLoadingState from '../../../hooks/useLoadingState';
import { getUsersFavoritePosts } from "../../../reducks/posts/operations";
import PostCard from '../../organisms/post/PostCard';
import usePagination from '../../../hooks/usePagination';
import DefaultPagination from '../../molecules/DefaultPagination';
import useReturnTop from '../../../hooks/useReturnTop';

export const UsersFavoritePosts = (props) => {
  const userId = useParams()
  const dispatch = useDispatch()
  const loadingState = useLoadingState()
  const { sumPage, setSumPage, queryPage} = usePagination()

  useEffect(()=> {
    dispatch(getUsersFavoritePosts(userId, queryPage, setSumPage))
  },[dispatch, userId, queryPage, setSumPage])

  const posts = useSelector((state)=> state.posts.list)
  const returnTop = useReturnTop()
  const changeCurrentPage = (e, page) => {
    dispatch(push(`users/${userId.id}/favoritePosts/posts?page=${page}`))
    returnTop();
  }
  return(
    <>
    { loadingState? (
      <Center w={{base: "50vh", md: "100vh"}}>
        <Spinner/>
      </Center>
    ): (
      <>
        <Box>
        {posts.length > 0 && (
          <Box mr="2" ml="2" mb="2">
            {
              posts.map(post =>(
                <PostCard key={post.id} post={post}/>
                ))
              }
          </Box>
        )}
          <DefaultPagination 
            count={sumPage}
            onChange={changeCurrentPage}
            page={queryPage}
          />
        </Box>
    </>
    )}
  </>
  )
}

export default UsersFavoritePosts;