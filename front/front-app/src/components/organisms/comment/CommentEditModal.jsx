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
import DeleteButton from "../../atoms/button/DeleteButton"
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMessage from "../../../hooks/useMessage";
import { deleteComment, updateComment } from "../../../reducks/comments/operations";
import useReturnTop from "../../../hooks/useReturnTop";

export const CommentEditModal = (props) => {
  const {isOpen, onClose, commentData} = props;
  const [comment, setComment] = useState(commentData.comment)
  const postId = useSelector((state)=> state.posts.id)
  const dispatch  = useDispatch()
  const loadingState = useLoadingState()
  const showMessage  = useMessage()
  const returnTop = useReturnTop()

  const inputComment = useCallback((e)=> {
    setComment(e.target.value)
  },[setComment])

  const onClickUpdateComment = useCallback(() => {
    dispatch(updateComment(commentData, comment, showMessage, returnTop))
    // setComment("")
    // onClose()
  },[dispatch, commentData, comment, showMessage, returnTop])

  const onClickDeleteComment = useCallback(()=> {
    dispatch(deleteComment(commentData, postId, showMessage))
    setComment("")
    onClose()
  },[commentData, dispatch, onClose, postId, showMessage])

  return(
    <Modal 
    isOpen={isOpen} 
    onClose={onClose} 
    autoFocus={false}
    motionPreset="slideInBottom"
    size="2xl"
    >
      <ModalOverlay>
        <ModalContent pb="6">
          <ModalHeader>
            コメント編集
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
                onClick={onClickUpdateComment}
                loading={loadingState}
                disabled={comment===""}
              >
                コメント送信
              </PrimaryButton>
              <br />
              <DeleteButton
                onClick={onClickDeleteComment}
              >
                削除
              </DeleteButton>
            </Stack>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}

export default CommentEditModal;