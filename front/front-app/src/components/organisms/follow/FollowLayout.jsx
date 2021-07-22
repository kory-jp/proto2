import React, { useCallback } from 'react'
import {push} from 'connected-react-router';
import { Box, Center } from '@chakra-ui/layout';
import { Spinner } from "@chakra-ui/spinner";
import useLoadingState from '../../../hooks/useLoadingState';
import usePagination from '../../../hooks/usePagination';
import DefaultPagination from '../../molecules/DefaultPagination';
import useReturnTop from '../../../hooks/useReturnTop';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import UsersCard from '../users/UsersCard';

export const FollowLayout = (props) => {
  const {users} = props
  const userId = useParams();
  const dispatch = useDispatch()
  const loadingState = useLoadingState()
  const returnTop = useReturnTop()
  const {queryPage, sumPage } = usePagination()


  const changeCurrentPage = useCallback((e, page) => {
    dispatch(push(`/users/${userId.id}/follows?page=${page}`))
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
        {users.length > 0 && (
          <Box mr="2" ml="2" mb="2">
            {
              users.map(user =>(
                <UsersCard key={user.id} user={user}/>
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

export default FollowLayout;