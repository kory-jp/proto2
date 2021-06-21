import React, { memo } from 'react'
import { Flex, Text } from '@chakra-ui/layout'
import { useDispatch } from 'react-redux'
import {push} from 'connected-react-router';
import { Button } from '@chakra-ui/button';
import { logOut } from '../../../reducks/users/operations';
import useMessage from '../../../hooks/useMessage';

export const Header = memo(()=> {
  const dispatch =  useDispatch();
  const showMessage = useMessage();
  return(
    <Flex bg="gray.400" h="100px" mb="4" p="4" w="full">
      <Flex mt="auto" mb="auto" justifyContent="space-between" w="full">
        <Text
        as="h1"
        fontSize="xl"
        fontWeight="bold"
        onClick={()=> dispatch(push('/posts'))}
        cursor="pointer"
        >
          トップページへ
        </Text>
        <Flex>
          <Button
            bg="white"
            onClick={()=> dispatch(push('/posts/new'))}
            mr="2"
          >
            新規投稿
          </Button>
          <Button
            bg="white"
            type="submit"
            onClick={()=> dispatch(logOut(showMessage))}
          >
            ログアウト
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
})

export default Header;