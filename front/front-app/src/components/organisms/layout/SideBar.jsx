import React from 'react'
import { Flex, Stack } from "@chakra-ui/layout";
import { Divider } from "@chakra-ui/react"
import { useDispatch } from 'react-redux';
import {push} from 'connected-react-router';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import FolderIcon from '@material-ui/icons/Folder';

import useMessage from '../../../hooks/useMessage';
import SideBarButton from '../../atoms/button/SIdeBarButton';
import { logOut } from '../../../reducks/currentUser/operations';
import useGetCurrentUserId from '../../../hooks/useGetCurrentUserId';

export const SideBar = ()=> {
  const dispatch =  useDispatch();
  const showMessage = useMessage();
  const currentUserId = useGetCurrentUserId()

  return(
    <Flex flexDirection="column" bg="white" shadow="md" borderRadius="md" p="2">
      <Stack>
        <SideBarButton
          onClick={()=> dispatch(push('/posts/new'))}
          leftIcon={<BorderColorIcon />}
        >
          新規投稿
        </SideBarButton>
        <SideBarButton
          onClick={()=> dispatch(push(`/mypage/${currentUserId}/posts`))}
          leftIcon={<FolderIcon />}
        >
          投稿記事
        </SideBarButton>
        <Divider color="gray.500" mt="3" mb="3" />
        <SideBarButton
          onClick={()=> dispatch(push(`/mypage/${currentUserId}/edit`))}
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
