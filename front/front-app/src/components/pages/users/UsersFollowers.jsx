import React, { useCallback, useEffect } from 'react'
import {push} from 'connected-react-router';
import { Box, Center } from '@chakra-ui/layout';
import { Spinner } from "@chakra-ui/spinner";
import useLoadingState from '../../../hooks/useLoadingState';
import usePagination from '../../../hooks/usePagination';
import DefaultPagination from '../../molecules/DefaultPagination';
import useReturnTop from '../../../hooks/useReturnTop';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getUsersFollowers } from '../../../reducks/users/operations';
import UsersCard from '../../organisms/users/UsersCard';

export const UsersFollowers = () => {
  const userId = useParams();
  const dispatch = useDispatch()
  const loadingState = useLoadingState()
  const returnTop = useReturnTop()
  const {queryPage, sumPage, setSumPage} = usePagination()

  useEffect(()=> {
    dispatch(getUsersFollowers(userId, queryPage, setSumPage))
  },[dispatch, userId, queryPage, setSumPage])

  const followers = useSelector(state => state.users.list)

  const changeCurrentPage = useCallback((e, page) => {
    dispatch(push(`/users/${userId.id}/followers?page=${page}`))
    returnTop();
  },[dispatch, returnTop, userId.id])

  return(
    <>
    { loadingState? (
      <Center w={{base: "50vh", md: "100vh"}}>
        <Spinner/>
      </Center>
    ): (
      <>
        {followers.length > 0 && (
          <Box mr="2" ml="2" mb="2">
            {
              followers.map(follower =>(
                <UsersCard key={follower.id} user={follower}/>
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
}

export default UsersFollowers;