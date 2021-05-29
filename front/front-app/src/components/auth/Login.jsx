import { Button } from '@chakra-ui/button';
import { FormControl } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Stack, Text } from '@chakra-ui/layout';
import React, { memo, useState } from 'react'
import axios from 'axios';

export const Login = memo((props)=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    axios
      .post("http://localhost:3001/api/v1/user/login", 
        {
          user: {
            email: email,
            password: password,
          }
        },
        {withCredentials: true}
      ).then(response => {
        console.log("login res", response)
      }).catch(error => {
        console.log("login error", error)
      })
    event.preventDefault()
  }

  return(
    <Box>
      <Text>ログイン</Text>
      <FormControl>
        <Stack spacing="3">
          <Input 
            id="f2"
            type="email"
            name="email"
            placeholder="メールアドレス"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <Input 
            id="f3"
            type="password"
            name="password"
            placeholder="パスワード"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <Button type="submit" onClick={handleSubmit}>ログイン</Button>
        </Stack>
      </FormControl>
    </Box>
  )
})

export default Login;