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

export const CommentInputModal = (props) => {
  const {isOpen, onClose, comment, onClick, onChange } = props;
  const loadingState = useLoadingState()
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
            新規コメント投稿
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
                  onChange={onChange}
                />
              </FormControl>
              <PrimaryButton
                onClick={onClick}
                loading={loadingState}
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