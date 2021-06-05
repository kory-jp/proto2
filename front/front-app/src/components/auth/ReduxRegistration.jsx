import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {registration} from "../../reducks/users/operations"

export const ReduxRegistration = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();

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

  return(
    <Box>
      <Text>ReduxRegistration</Text>
      <Stack spacing="3">
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
        <Button
          type="submit"
          onClick={()=> dispatch(registration(userName, email, password, passwordConfirmation))}
        >新規登録</Button>
      </Stack>
    </Box>    
  )
}

export default ReduxRegistration;