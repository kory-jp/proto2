import React, { memo } from 'react'
import { Flex, Stack } from "@chakra-ui/layout";
import { useDispatch } from 'react-redux';
import {push} from 'connected-react-router';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';

import useMessage from '../../../hooks/useMessage';
import SideBarButton from '../../atoms/button/SIdeBarButton';
import { logOut } from '../../../reducks/users/operations';

export const SideBar = memo(()=> {
  const dispatch =  useDispatch();
  const showMessage = useMessage();

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
          onClick={()=> dispatch(push('/mypage/edit'))}
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
})

export default SideBar;
