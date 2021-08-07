import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  FormControl
} from "@chakra-ui/react"
import { Input } from "@material-ui/core"
import { useCallback, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { DefaultText } from "../../../assets/style/chakraStyles"
import useLoadingState from "../../../hooks/useLoadingState"
import useMessage from "../../../hooks/useMessage"
import { deleteAccount } from "../../../reducks/currentUser/operations"

export const DeleteUserAlertDialog = (props) => {
  const {isOpen, setIsOpen} = props
  const dispatch = useDispatch()
  const showMessage = useMessage()
  const [password, setPassword] = useState('')
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()
  const loadingState = useLoadingState()

  const inputPassword = useCallback((event)=> {
    setPassword(event.target.value)
  },[])

  const onClickDeleteAccount = useCallback(()=> {
    dispatch(deleteAccount(password, showMessage))
    setPassword('')
    setIsOpen(false)
  },[dispatch, showMessage, setIsOpen, password])

  return(
    <AlertDialog
    id="deleteUserAlertDialog"
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent w="5xl">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            アカウント削除
          </AlertDialogHeader>

          <AlertDialogBody>
            <DefaultText mb="4">
              アカウント削除されますがよろしいでしょうか？ <br/>
              削除される場合は、パスワードを入力後に<br/>
              ｢アカウント削除｣を押してください
            </DefaultText>
            <FormControl as="form">
              <Input
                id="passwordForm"
                type="password"
                name="password"
                placeholder="パスワード"
                fontSize={{base: "sm", md: "lg"}}
                required={true}
                value={password}
                onChange={inputPassword}
                autoComplete="off"
              />
            </FormControl>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              戻る
            </Button>
            <Button 
              colorScheme="red" 
              ml={3}
              disabled={ password === "" || loadingState}
              isLoading = {loadingState}
              onClick={onClickDeleteAccount}
            >
              アカウント削除
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteUserAlertDialog;