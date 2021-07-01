import { useDisclosure } from '@chakra-ui/react';
import CreateIcon from '@material-ui/icons/Create';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultFlex, DefaultText } from "../../../assets/style/chakraStyles";
import useMessage from '../../../hooks/useMessage';
import { newComment } from '../../../reducks/comments/operations';
import CommentInputModal from './CommnetInputModal';
import CommentsShow from './CommentsShow';

export const CommentArea = (props) => {
  const postId = props.postId.id
  const sumPage = props.sumPage
  const currentUserId = useSelector((state)=> state.currentUser.id)
  const { isOpen, onOpen, onClose} = useDisclosure()
  const [comment, setComment] = useState("")
  const dispatch  = useDispatch()
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
    <>
      <DefaultFlex mt="5" w="100%" flexDirection="column">
        <DefaultFlex justifyContent="space-between" w="100%" mb="6"bg="gray.100">
          <DefaultText>
            コメント欄
          </DefaultText>
          <DefaultText
            onClick={onOpen}
            as="button"
          >
            <CreateIcon/>
            コメント投稿
          </DefaultText>
        </DefaultFlex>
        <CommentsShow sumPage={sumPage}/>
      </DefaultFlex>
      <CommentInputModal 
        isOpen={isOpen} 
        onClose={onClose} 
        onClick={onClickNewComments} 
        comment={comment} 
        onChange={inputComment}
      />
    </>
  )
} 

export default CommentArea;