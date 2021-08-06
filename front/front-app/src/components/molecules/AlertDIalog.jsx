import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react"
import { useRef } from "react"

export const AlertDialogComponent = (props) => {
  const {isOpen, setIsOpen, text, onClick} = props
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()
  return(
    <AlertDialog
    id="deleteAlert"
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={onClose}
  >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          {text}
        </AlertDialogHeader>

        <AlertDialogBody>
           本当に削除してもよろしいでしょうか？
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            戻る
          </Button>
          <Button colorScheme="red" onClick={onClick} ml={3}>
            削除
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>

  )
}

export default AlertDialogComponent;