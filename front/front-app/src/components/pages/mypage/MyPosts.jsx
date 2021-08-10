import { Box, Center } from '@chakra-ui/layout';
import { Spinner } from "@chakra-ui/spinner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {push} from 'connected-react-router';

import useLoadingState from '../../../hooks/useLoadingState';
import { getCurrentUserPosts } from "../../../reducks/posts/operations";
import MyPostCard from '../../organisms/post/MyPostCard';
import usePagination from '../../../hooks/usePagination';
import DefaultPagination from '../../molecules/DefaultPagination';
import useReturnTop from '../../../hooks/useReturnTop';
import { DefaultFlex, DefaultTitleText } from '../../../assets/style/chakraStyles';
import useMessage from '../../../hooks/useMessage';
import { loggedInStatus } from '../../../reducks/currentUser/operations';

export const MyPosts = () => {
  const currentUserId = useParams()
  const dispatch = useDispatch()
  const { sumPage, setSumPage, queryPage} = usePagination()
  const showMessage = useMessage()
  const loadingState = useLoadingState()

  useEffect(()=> {
    dispatch(loggedInStatus(showMessage))
    dispatch(getCurrentUserPosts(currentUserId, queryPage, setSumPage))
  },[dispatch, currentUserId, queryPage, setSumPage, showMessage])

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
          <DefaultFlex
            mb="4"
          >
            <DefaultTitleText
            ml="auto"
            mr="auto"
            >
              投稿一覧
            </DefaultTitleText>
          </DefaultFlex>
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

export default MyPosts;