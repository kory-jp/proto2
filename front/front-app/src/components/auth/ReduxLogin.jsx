import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {logIn} from "../../reducks/users/operations"

export const ReduxLogin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const inputEmail = useCallback((event)=> {
    setEmail(event.target.value)
  }, [setEmail])

  const inputPassword = useCallback((event)=> {
    setPassword(event.target.value)
  }, [setPassword])

  return(
    <Box>
      <Text>ReduxLogin</Text>
      <Stack spacing="3">
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
        <Button
          type="submit"
          onClick={()=> dispatch(logIn(email, password))}
        >ログイン</Button>
      </Stack>
    </Box>    
  )
}

export default ReduxLogin;