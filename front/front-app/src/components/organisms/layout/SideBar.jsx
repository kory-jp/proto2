import React, { useCallback } from 'react'
import { Flex, Stack } from "@chakra-ui/layout";
import { Divider } from "@chakra-ui/react"
import { useDispatch } from 'react-redux';
import {push} from 'connected-react-router';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import FolderIcon from '@material-ui/icons/Folder';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import GroupIcon from '@material-ui/icons/Group';

import useMessage from '../../../hooks/useMessage';
import SideBarButton from '../../atoms/button/SIdeBarButton';
import { logOut } from '../../../reducks/currentUser/operations';
import useGetCurrentUserId from '../../../hooks/useGetCurrentUserId';
import useReturnTop from '../../../hooks/useReturnTop';
import { nowLoadingAction } from '../../../reducks/loading/actions';

export const SideBar = ()=> {
  const dispatch =  useDispatch();
  const showMessage = useMessage();
  const returnTop = useReturnTop()
  const currentUserId = useGetCurrentUserId()

  const toFollows = useCallback(()=> {
    dispatch(push(`/mypage/${currentUserId}/follows`))
    returnTop()
  },[dispatch, returnTop, currentUserId])

  const toFollowers = useCallback(()=> {
    dispatch(push(`/mypage/${currentUserId}/followers`))
    returnTop()
  },[dispatch, returnTop, currentUserId])

  const toNewPost = useCallback(()=> {
    dispatch(push('/posts/new'))
    returnTop()
  },[dispatch, returnTop])

  const toMyPosts = useCallback(()=> {
    dispatch(push(`/mypage/${currentUserId}/posts`))
    dispatch(nowLoadingAction(true));
    returnTop()
  },[dispatch, returnTop, currentUserId])

  const toMyFavoritePosts = useCallback(()=> {
    dispatch(push(`/mypage/${currentUserId}/favoritePosts`))
    dispatch(nowLoadingAction(true));
    returnTop()
  },[dispatch, returnTop, currentUserId])

  const toEditProfile = useCallback(()=> {
    dispatch(push(`/mypage/${currentUserId}/edit`))
    dispatch(nowLoadingAction(true));
    returnTop()
  },[dispatch, returnTop, currentUserId])

  return(
    <Flex flexDirection="column" bg="white" shadow="md" borderRadius="md" p="2">
      <Stack mt="5" mb="3" spacing="5">
        <SideBarButton
          onClick={toNewPost}
          leftIcon={<BorderColorIcon />}
        >
          新規投稿
        </SideBarButton>
        <SideBarButton
          onClick={toMyPosts}
          leftIcon={<FolderIcon />}
        >
          投稿記事
        </SideBarButton>
        <SideBarButton
          onClick={toMyFavoritePosts}
          leftIcon={<ThumbUpIcon />}
        >
          高評価記事
        </SideBarButton>
      </Stack>
      <Divider color="gray.500" mt="3" mb="4" />
      <Stack mb="3" spacing="5">
        <SideBarButton
          onClick={toFollows}
          leftIcon={<GroupAddIcon />}
        >
          フォロー
        </SideBarButton>
        <SideBarButton
          onClick={toFollowers}
          leftIcon={<GroupIcon />}
        >
          フォロワー
        </SideBarButton>
      </Stack>
      <Divider color="gray.500" mt="3" mb="4" />
      <Stack mb="7" spacing="5">
        <SideBarButton
          onClick={toEditProfile}
          leftIcon={<PersonIcon />}
          >
          個人情報修正
        </SideBarButton>
        <SideBarButton
          onClick={()=> dispatch(logOut(showMessage))}
          leftIcon={<ExitToAppIcon />}
          >
          ログアウト
        </SideBarButton>
      </Stack>
     </Flex>
  )
}

export default SideBar;
