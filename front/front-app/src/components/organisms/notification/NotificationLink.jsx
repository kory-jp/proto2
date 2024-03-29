import { Link } from "@chakra-ui/react";
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useDisclosure } from "@chakra-ui/react"
import NotificationModal from "./NotificationModal";
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { getNotifications } from "../../../reducks/notifications/operations";
import { useDispatch, useSelector } from "react-redux";

export const NotificationLink = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const dispatch = useDispatch()
  const [alert, setAlert] = useState(false)

  // 未確認の通知があるか確認
  const uncheckedNotifications = useCallback((queryPage, setSumPage)=> {
    const apiURL =
    process.env.REACT_APP_USERS_API_URL +
    "notifications/unchecked_notifications";
    axios
      .get(
        apiURL,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setAlert(response.data)
      })
      .catch((error) => {
        console.log("error:", error);
      })
  },[])

  useEffect(()=> {
    uncheckedNotifications()
  },[uncheckedNotifications])

  // モーダルを閉じつつ、再度、未確認の通知が無いか確認
  const onClickNotifications = useCallback(()=> {
    onOpen()
    dispatch(getNotifications())
  },[onOpen, dispatch])

  const notifications = useSelector((state)=> state.notifications.list)

  const onClickCheckNotifications = useCallback(()=> {
    uncheckedNotifications()
    onClose()
  },[onClose, uncheckedNotifications])


  return(
    <>
      <Link onClick={onClickNotifications}>
        {
          alert ? (
              <NotificationImportantIcon style={{color: 'blue'}}/>
            ) : (
              <NotificationsIcon  style={{color: 'white'}}/>
            )
        }
      </Link>
      <NotificationModal 
        onClose={onClickCheckNotifications} 
        isOpen={isOpen}
        notifications={notifications}
      />
    </>
  )
}

export default NotificationLink;