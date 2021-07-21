import React, { useEffect } from 'react'
import usePagination from '../../../hooks/usePagination';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getUsersFollows } from '../../../reducks/users/operations';
import FollowLayout from '../../organisms/follow/FollowLayout';

export const UsersFollows = () => {
  const userId = useParams();
  const dispatch = useDispatch()
  const {queryPage, setSumPage} = usePagination()

  useEffect(()=> {
    dispatch(getUsersFollows(userId, queryPage, setSumPage))
  },[dispatch, userId, queryPage, setSumPage])

  const follows = useSelector(state => state.users.list)

  return(
    <FollowLayout users={follows} />
  )
}

export default UsersFollows;