import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "@chakra-ui/input";
import {
  Divider,
  FormControl,
  FormLabel,
  Stack,
} from "@chakra-ui/react"

import { DefaultFlex, DefaultTitleText } from "../../../assets/style/chakraStyles";
import PrimaryButton from "../../atoms/button/PrimaryButton";
import useMessage from "../../../hooks/useMessage";
import { changePassword } from "../../../reducks/currentUser/operations";
import useLoadingState from "../../../hooks/useLoadingState";

export const PasswordEdit = () => {
  const dispatch = useDispatch()
  const showMessage = useMessage()
  const loadingState = useLoadingState()

  const [previousPassword, setPreviousPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const inputPreviousPassword = useCallback((event)=> {
    setPreviousPassword(event.target.value)
  },[])

  const inputPassword = useCallback((event)=> {
    setPassword(event.target.value)
  },[])

  const inputPasswordConfirmation = useCallback((event)=> {
    setPasswordConfirmation(event.target.value)
  },[])

  const onClickChangePassword = useCallback(()=> {
    dispatch(changePassword(showMessage, previousPassword, password, passwordConfirmation))
  },[passwordConfirmation, dispatch, password, previousPassword, showMessage])

  return(
    <DefaultFlex flexDirection="column">
      <DefaultTitleText mb="4" ml="auto" mr="auto">パスワード修正</DefaultTitleText>
      <Divider mb="6"/>
      <FormControl as="form">
        <Stack spacing="6">
          <FormLabel fontSize={{base: "xs", md: "md"}}>変更前のパスワード</FormLabel>
          <Input
            id="previousPassword"
            type="password"
            name="password"
            placeholder="変更前"
            fontSize={{base: "sm", md: "lg"}}
            required={true}
            value={previousPassword}
            onChange={inputPreviousPassword}
            autoComplete="off"
          />
          <FormLabel fontSize={{base: "xs", md: "md"}}>変更後のパスワード</FormLabel>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="変更後"
            fontSize={{base: "sm", md: "lg"}}
            required={true}
            value={password}
            onChange={inputPassword}
            autoComplete="off"
          />
          <FormLabel fontSize={{base: "xs", md: "md"}}>変更後のパスワード(確認)</FormLabel>
          <Input 
            id="confirmPassword"
            type="password"
            name="password"
            placeholder="変更後(確認)"
            fontSize={{base: "sm", md: "lg"}}
            required={true}
            value={passwordConfirmation}
            onChange={inputPasswordConfirmation}
            autoComplete="off"
          />
          <PrimaryButton 
            disabled={previousPassword === "" || password ==="" || passwordConfirmation === ""}
            isLoading={loadingState}
            onClick={onClickChangePassword}
          >
            パスワード更新
          </PrimaryButton >
        </Stack>
      </FormControl>
    </DefaultFlex>
  )
}

export default PasswordEdit;