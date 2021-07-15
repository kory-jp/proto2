import { useDispatch } from 'react-redux'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Divider,
  Stack,
} from "@chakra-ui/react"
import { Button } from '@chakra-ui/button';
import useMessage from '../../hooks/useMessage';
import {push} from 'connected-react-router';
import { logOut } from '../../reducks/currentUser/operations';
import useGetCurrentUserId from '../../hooks/useGetCurrentUserId';
import SearchInputForm from './SearchInputForm';
import useReturnTop from '../../hooks/useReturnTop';
import { nowLoadingAction } from '../../reducks/loading/actions';
import { useCallback } from 'react';

export const MenuDrawer = (props) => {
  const {onClose, isOpen, keyword, model, onChangeKeyword, onChangeModel, toSearchResult} = props;
  const dispatch =  useDispatch();
  const showMessage = useMessage();
  const returnTop = useReturnTop()
  const currentUserId = useGetCurrentUserId()

  const toNewPost = useCallback(() => {
    dispatch(push('/posts/new'))
    dispatch(nowLoadingAction(true));
    returnTop()
    onClose()
  },[dispatch, onClose, returnTop])

  const toMyPosts = useCallback(() => {
    dispatch(push(`/mypage/${currentUserId}/posts`))
    dispatch(nowLoadingAction(true));
    returnTop()
    onClose()
  },[dispatch, onClose, returnTop, currentUserId])

  const toFavoritePosts = useCallback(() => {
    dispatch(push(`/mypage/${currentUserId}/favoritePosts`))
    dispatch(nowLoadingAction(true));
    returnTop()
    onClose()
  },[dispatch, onClose, returnTop, currentUserId])

  const toEditProfile = useCallback(() => {
    dispatch(push(`/mypage/${currentUserId}/edit`))
    dispatch(nowLoadingAction(true));
    returnTop()
    onClose()
  },[dispatch, onClose, returnTop, currentUserId])

  
  return(
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader fontSize="sm">メニュー</DrawerHeader>
        <DrawerBody
          p="2"
          bg="gray.100"
        >
          <SearchInputForm 
            keyword={keyword}
            model={model}
            onChangeKeyword={onChangeKeyword}
            onChangeModel={onChangeModel}
            toSearchResult={toSearchResult}
          />
          <Divider 
            mb="7"
          />
          <Stack spacing="4">
            <Button
              bg="white"
              onClick={toNewPost}
              fontSize="sm"
              w="100%"
              mt="4"
              >
              新規投稿
            </Button>
            <Button
              bg="white"
              onClick={toMyPosts}
              fontSize="sm"
              w="100%"
              >
              投稿記事
            </Button>
            <Button
              bg="white"
              onClick={toFavoritePosts}
              fontSize="sm"
              w="100%"
              >
              お気に入り
            </Button>
          </Stack>
          <Divider 
          mb="7"
          />
          <Stack spacing="4">            
            <Button
              bg="white"
              onClick={toEditProfile}
              fontSize="sm"
              w="100%"
              >
              個人情報修正
            </Button>
            <Button
              bg="white"
              onClick={()=> dispatch(logOut(showMessage))}
              fontSize="sm"
              w="100%"
              >
              ログアウト
            </Button>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </DrawerOverlay>
  </Drawer>
  )
} 

export default MenuDrawer;