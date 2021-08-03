import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  Box,
  Link,
} from "@chakra-ui/react"
import { push } from "connected-react-router";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import useReturnTop from "../../../hooks/useReturnTop";
import NotificationCard from "./NotificationCard";

export const NotificationModal = (props)=> {
  const {onClose, isOpen, notifications} = props;
  const returnTop = useReturnTop()
  const dispatch = useDispatch()
  const modal = true

  const toNotifications = useCallback(()=> {
    dispatch(push('/notifications'))
    returnTop()
    onClose()
  },[dispatch, returnTop, onClose])

  return(
    <Modal         
      onClose={onClose} 
      isOpen={isOpen}
    >
      <ModalOverlay />
      <ModalContent
        minW={{base: "xs", md: "xl"}}
      >
        <ModalHeader>通知一覧</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="2">
            {
              notifications ? (
                <Box>
                  {
                    notifications.map(notification => (
                      <NotificationCard 
                        key={notification.id} 
                        notification={notification} 
                        onClose={onClose} 
                        modal={modal}
                      />
                    ))
                  }
                </Box>
              ) : null
            }
            <Link
            textAlign="center"
            fontSize={{base: 'sm', md: 'lg'}}
            onClick={toNotifications}
            >
              通知一覧へ
            </Link>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default NotificationModal;