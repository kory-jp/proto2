import { Input } from "@chakra-ui/input";
import { Box, Link, Stack, Text } from "@chakra-ui/layout";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {push} from 'connected-react-router';

import {registration} from "../../reducks/users/operations"
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { getLoadingState } from "../../reducks/loading/selectors";
import useMessage from "../../hooks/useMessage";

export const ReduxRegistration = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const inputUserName = useCallback((event)=> {
    setUserName(event.target.value)
  }, [setUserName])

  const inputEmail = useCallback((event)=> {
    setEmail(event.target.value)
  }, [setEmail])

  const inputPassword = useCallback((event)=> {
    setPassword(event.target.value)
  }, [setPassword])

  const inputPasswordConfirmation = useCallback((event)=> {
    setPasswordConfirmation(event.target.value)
  }, [setPasswordConfirmation])

  const onClickLogin = () => {
    dispatch(push('/'))
  }

  const selector =  useSelector((state) => state);
  const loadingState = getLoadingState(selector);

  const showMessage = useMessage();

  return(
    <Box bg="white" p="5" shadow="md" borderRadius="md">
      <Text 
      textAlign="center"
      fontWeight="bold"
      >
        新規登録
      </Text>
      <Stack spacing="5">
        <Input 
          id="f1"
          type="name"
          name="name"
          placeholder="名前"
          required={true}
          value={userName}
          onChange={inputUserName}
        />
        <Input
          id="f4"
          type="email"
          name="email"
          placeholder="メールアドレス"
          required={true}
          value={email}
          onChange={inputEmail}
        />
        <Input
          id="f5"
          type="password"
          name="password"
          placeholder="パスワード"
          required={true}
          value={password}
          onChange={inputPassword}
        />
        <Input 
          id="f4"
          type="password"
          name="password_confirmation"
          placeholder="確認用パスワード"
          required={true}
          value={passwordConfirmation}
          onChange={inputPasswordConfirmation}
        /> 
        <PrimaryButton
          type="submit"
          onClick={()=> dispatch(registration(userName, email, password, passwordConfirmation, showMessage))}
          loading = {loadingState}
          disabled={userName === "" || email === ""|| password === "" || passwordConfirmation === ""}
        >
          新規登録
        </PrimaryButton>
        <Link onClick={onClickLogin} textAlign="center">
          ログイン
        </Link>
      </Stack>
    </Box>    
  )
}

export default ReduxRegistration;