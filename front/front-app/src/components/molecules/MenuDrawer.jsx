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

  const toMyFollows = useCallback(()=> {
    dispatch(push(`/mypage/${currentUserId}/follows`))
    returnTop()
    onClose()
  },[dispatch, returnTop, onClose, currentUserId])

  const toMyFollowers = useCallback(()=> {
    dispatch(push(`/mypage/${currentUserId}/followers`))
    returnTop()
    onClose()
  },[dispatch, returnTop, onClose, currentUserId])

  const toRooms = useCallback(()=> {
    dispatch(push(`/mypage/${currentUserId}/rooms`))
    returnTop()
    onClose()
  },[dispatch, returnTop, onClose, currentUserId])

  const toEditProfile = useCallback(() => {
    dispatch(push(`/mypage/${currentUserId}/edit`))
    dispatch(nowLoadingAction(true));
    returnTop()
    onClose()
  },[dispatch, onClose, returnTop, currentUserId])

  
  return(
    <Drawer 
    placement="left" 
    size="xs" 
    onClose={onClose} 
    isOpen={isOpen}
    id="menuDrawer"
    >
    <DrawerOverlay>
      <DrawerContent
      >
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
              onClick={toMyFollows}
              fontSize="sm"
              w="100%"
              >
                フォロー
            </Button>
            <Button
              bg="white"
              onClick={toMyFollowers}
              fontSize="sm"
              w="100%"
              >
                フォロワー
            </Button>
          </Stack>
          <Divider mb="7"/>
          <Button
            bg="white"
            onClick={toRooms}
            fontSize="sm"
            w="100%"
          >
            チャットルーム
          </Button>
          <Divider mb="7"/>
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