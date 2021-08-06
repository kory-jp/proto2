import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { DefaultFlex, DefaultText, DefaultUserIconImage } from "../../../assets/style/chakraStyles";
import defaultUserIcon from "../../../assets/img/defaultUserIcon.jpeg"
import { useCallback } from "react";
import { Box, Flex, Link } from "@chakra-ui/react";
import useReturnTop from "../../../hooks/useReturnTop";
import { deleteModalNotification, deletePageNotification } from "../../../reducks/notifications/operations";

export const NotificationCard = (props) => {
  const { notification, onClose, modal, setSumPage, queryPage } = props;
  const returnTop = useReturnTop()
  const dispatach = useDispatch()
  const { id, action, icon, nickname, post_id, room_id, visitor_id, created_at} = notification

  // 通知一覧画面とモーダル画面のうち、モーダル画面上のNotificationCardのみonCloseを実行
  const toUser = useCallback(()=> {
    dispatach(push(`/users/${visitor_id}`))
    returnTop()
    if(modal) {
      onClose()
    }
  },[dispatach, onClose, returnTop, visitor_id, modal])

  const toPost = useCallback(()=> {
    dispatach(push(`/posts/show/${post_id}`))
    returnTop()
    if(modal) {
      onClose()
    }
  },[dispatach, onClose, post_id, returnTop, modal])

  const toRoom = useCallback(()=> {
    dispatach(push(`/room/${room_id}`))
    returnTop()
    if(modal) {
      onClose()
    }
  },[dispatach, onClose, room_id, returnTop, modal])

  // ページネーションの関係上、モーダル画面と通知一覧画面では取得するデータを切り替える
  const onClickDeleteNotification = useCallback(()=> {
    if(modal) {
      dispatach(deleteModalNotification(id))
    } else {
      dispatach(deletePageNotification(id, setSumPage, queryPage))
    }
  },[dispatach, modal, id, setSumPage, queryPage])


  const notificationMessage = useCallback(()=> {
    switch(action) {
      case 'favorite': return(
        <Link onClick={toPost}>{nickname}さんがあなたの投稿に高評価しました</Link>
      )
      case 'comment' : return(
        <Link onClick={toPost}>{nickname}さんがあなたの投稿にコメントをしました</Link>
      )  
      case 'follow' : return(
        <Link onClick={toUser}>{nickname}さんがあなたをフォローしました</Link>
      )
      case 'message' : return(
        <Link onClick={toRoom}>{nickname}さんからメッセージがあります</Link>
      )
      default:
        <DefaultText>通知はありません</DefaultText>
    }
  },[action, nickname, toPost, toUser, toRoom])

  return(
    <DefaultFlex
      backgroundColor="gray.100"
      mb="2"
    >
      <DefaultUserIconImage 
        src={icon.url? icon.url : defaultUserIcon}
        boxSize={{ base: "20px", md: "30px" }}
        onClick={toUser}
        cursor="pointer"
        mr="2"
      />
      <Box>
        <DefaultText>
          {notificationMessage()}
        </DefaultText>
        <DefaultText
          fontSize="5px"
        >
          {created_at}
        </DefaultText>
      </Box>
      <Flex 
      ml="auto"
      cursor="pointer"
      onClick={onClickDeleteNotification}
      >
        <HighlightOffIcon/>
      </Flex>
    </DefaultFlex>
  )
}

export default NotificationCard;