import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  Textarea,
} from "@chakra-ui/react"
import { FormControl, FormLabel } from "@material-ui/core";
import useLoadingState from "../../../hooks/useLoadingState";
import PrimaryButton from "../../atoms/button/PrimaryButton"
import useGetCurrentUserId from "../../../hooks/useGetCurrentUserId";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import useMessage from "../../../hooks/useMessage";
import { newComment } from "../../../reducks/comments/operations";

export const CommentInputModal = (props) => {
  const {isOpen, onClose, postId } = props;
  const currentUserId = useGetCurrentUserId()
  const [comment, setComment] = useState("")
  const dispatch  = useDispatch()
  const loadingState = useLoadingState()
  const showMessage  = useMessage()
  
  const inputComment = useCallback((e)=> {
    setComment(e.target.value)
  },[setComment])

  const onClickNewComments = useCallback(() => {
    dispatch(newComment(showMessage, postId, currentUserId, comment))
    setComment("")
    onClose()
  },[setComment, comment, currentUserId, dispatch, onClose, postId, showMessage])

  return(
    <Modal 
    isOpen={isOpen} 
    onClose={onClose} 
    autoFocus={false}
    motionPreset="slideInBottom"
    size="2xl"
    >
      <ModalOverlay>
        <ModalContent pb="5">
          <ModalHeader>
            "新規コメント投稿"
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mx={4}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>コメント本文</FormLabel>
                <Textarea 
                  mt="2"
                  rows="10"
                  placeholder="コメントを入力してください"
                  value={comment}
                  onChange={inputComment}
                />
              </FormControl>
              <PrimaryButton
                onClick={onClickNewComments}
                isLoading={loadingState}
                disabled={comment===""}
              >
                コメント送信
              </PrimaryButton>
            </Stack>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}

export default CommentInputModal;