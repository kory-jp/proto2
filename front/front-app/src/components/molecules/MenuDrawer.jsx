import { useDispatch } from 'react-redux'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"
import { Button } from '@chakra-ui/button';
import useMessage from '../../hooks/useMessage';
import {push} from 'connected-react-router';
import { logOut } from '../../reducks/users/operations';

export const MenuDrawer = (props) => {
  const {onClose, isOpen} = props;
  const dispatch =  useDispatch();
  const showMessage = useMessage();
  const toNewPost = () => {
    dispatch(push('/posts/new'))
    onClose()
  }

  const toEditProfile = () => {
    dispatch(push('/mypage/edit'))
    onClose()
  }
  
  return(
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader fontSize="sm">メニュー</DrawerHeader>
        <DrawerBody
          p="0"
          bg="gray.100"
        >
          <Button
            bg="white"
            onClick={toNewPost}
            fontSize="sm"
            w="100%"
            m="2"
          >
            新規投稿
          </Button>
          <Button
            bg="white"
            onClick={toEditProfile}
            fontSize="sm"
            w="100%"
            m="2"
          >
            個人情報修正
          </Button>
          <Button
            bg="white"
            onClick={()=> dispatch(logOut(showMessage))}
            fontSize="sm"
            w="100%"
            m="2"
          >
            ログアウト
          </Button>
        </DrawerBody>
      </DrawerContent>
    </DrawerOverlay>
  </Drawer>
  )
} 

export default MenuDrawer;