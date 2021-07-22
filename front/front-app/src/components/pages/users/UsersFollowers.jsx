import React, { useEffect } from 'react'
import usePagination from '../../../hooks/usePagination';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getUsersFollowers } from '../../../reducks/users/operations';
import FollowLayout from '../../organisms/follow/FollowLayout';

export const UsersFollowers = () => {
  const userId = useParams();
  const dispatch = useDispatch()
  const {queryPage, setSumPage} = usePagination()

  useEffect(()=> {
    dispatch(getUsersFollowers(userId, queryPage, setSumPage))
  },[dispatch, userId, queryPage, setSumPage])

  const followers = useSelector(state => state.users.list)

  return(
    <FollowLayout users={followers}/>
  )
}

export default UsersFollowers;