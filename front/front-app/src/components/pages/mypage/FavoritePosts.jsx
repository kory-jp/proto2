import { Box, Center } from '@chakra-ui/layout';
import { Spinner } from "@chakra-ui/spinner";
import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {push} from 'connected-react-router';

import useLoadingState from '../../../hooks/useLoadingState';
import { getCurretUserFavoritePosts } from "../../../reducks/posts/operations";
import MyPostCard from '../../organisms/post/MyPostCard';
import usePagination from '../../../hooks/usePagination';
import DefaultPagination from '../../molecules/DefaultPagination';
import useReturnTop from '../../../hooks/useReturnTop';

export const FavoritePosts = () => {
  const currentUserId = useParams()
  const dispatch = useDispatch()
  const loadingState = useLoadingState()
  const { sumPage, setSumPage, queryPage} = usePagination()

  useEffect(()=> {
    dispatch(getCurretUserFavoritePosts(currentUserId, queryPage, setSumPage))
  },[dispatch, currentUserId, queryPage, setSumPage])

  const posts = useSelector((state)=> state.posts.list)
  const returnTop = useReturnTop()
  const changeCurrentPage = (e, page) => {
    dispatch(push(`/mypage/${currentUserId.id}/posts?page=${page}`))
    returnTop();
  }
  return(
    <>
    { loadingState? (
      <Center  h="100vh" w={{base: "50vh", md: "100vh"}}>
        <Spinner/>
      </Center>
    ): (
      <>
        <Box>
        <Text
          bg="white"
          mr="2"
          ml="2"
          mb="2"
          p="2"
          shadow="md"
          borderRadius="md"
          fontSize={{base: "md", md: "2xl"}}
        >
          高評価記事一覧
        </Text>
        {posts.length > 0 && (
          <Box mr="2" ml="2" mb="2">
            {
              posts.map(post =>(
                <MyPostCard key={post.id} post={post}/>
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

export default FavoritePosts;