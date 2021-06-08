import { Button } from '@chakra-ui/button';
import { Box, Text } from '@chakra-ui/layout';
import React, { memo} from 'react'
import {useSelector} from "react-redux";
import { useDispatch } from "react-redux";

import {logOut} from "../../reducks/users/operations"
import {getUser} from '../../reducks/users/selectors'

export const Dashboard = memo(()=> {

  const selector = useSelector((state) => state);
  console.log(selector)
  const reduxUser = getUser(selector);
  console.log(reduxUser)



  const dispatch = useDispatch();

  return(
    <Box>
      <Box>
        <Text>ReduxLoginUserInfo</Text>
        <h2>ログイン状態: {`${reduxUser.logged_in}`}</h2>
        <p>ユーザーID:{reduxUser.id}</p>
        <p>ユーザー名:{`${reduxUser.name}`}</p>
      </Box>
      <Button
        type="submit"
        onClick={()=> dispatch(logOut())}
      >
        ログアウト
      </Button>
    </Box>
  )
})

export default Dashboard;