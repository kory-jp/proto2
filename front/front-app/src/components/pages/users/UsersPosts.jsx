import React, { memo } from 'react'
import {push} from 'connected-react-router';
import { Box, Center } from '@chakra-ui/layout';
import { Spinner } from "@chakra-ui/spinner";
import PostCard from '../../organisms/post/PostCard';
import useLoadingState from '../../../hooks/useLoadingState';
import usePagination from '../../../hooks/usePagination';
import DefaultPagination from '../../molecules/DefaultPagination';
import { DefaultText, DefaultBox } from '../../../assets/style/chakraStyles'
import useReturnTop from '../../../hooks/useReturnTop';
import { useDispatch } from 'react-redux';

export const UsersPosts = memo((props) => {
  const posts = props.posts.list
  const userId = props.userId
  const sumPage = props.sumPage
  const dispatch = useDispatch()
  const loadingState = useLoadingState()
  const { queryPage } = usePagination()
  const returnTop = useReturnTop()
  const changeCurrentPage = (e, page) => {
    dispatch(push(`/users/${userId.id}posts?page=${page}`))
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
        <DefaultBox
        mb="4"
        >
          <DefaultText>
            投稿履歴
          </DefaultText>
        </DefaultBox>
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
    </>
    )}
  </>
  )
})

export default UsersPosts;