import { useDisclosure } from '@chakra-ui/react';
import CommentIcon from '@material-ui/icons/Comment';
import { DefaultFlex, DefaultText } from "../../../assets/style/chakraStyles";
import CommentInputModal from './CommnetInputModal';
import CommentsShow from './CommentsShow';

export const CommentArea = (props) => {
  const postId = props.postId.id
  const sumPage = props.sumPage
  const { isOpen, onOpen, onClose} = useDisclosure()
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
            <CommentIcon />
            コメント投稿
          </DefaultText>
        </DefaultFlex>
        <CommentsShow sumPage={sumPage}/>
      </DefaultFlex>
      <CommentInputModal 
        isOpen={isOpen} 
        onClose={onClose} 
        postId={postId}
      />
    </>
  )
} 

export default CommentArea;