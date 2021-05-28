import { Button } from '@chakra-ui/button';
import { FormControl } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Stack, Text } from '@chakra-ui/layout';
import React, { memo, useState } from 'react'
import axios from 'axios';

export const Registration = memo(()=> {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const handleSubmit = (event) => {
    axios
      .post("http://localhost:3001/api/v1/user/signup", 
        {
          user: {
            name: name,
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation
          }
        },
        {withCredentials: true}
      ).then(response => {
        console.log("registration", response)
      }).catch(error => {
        console.log("registration error", error)
      })
    event.preventDefault()
  }

  return(
    <Box>
      <Text>新規登録</Text>
      <FormControl>
        <Stack spacing="3">
          <Input 
            id="f1"
            type="name"
            name="name"
            placeholder="名前"
            value={name}
            onChange={event => setName(event.target.value)}
          />
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
          <Input 
            id="f4"
            type="password"
            name="password_confirmation"
            placeholder="確認用パスワード"
            value={passwordConfirmation}
            onChange={event => setPasswordConfirmation(event.target.value)}
          /> 
          <Button type="submit" onClick={handleSubmit}>登録</Button>
        </Stack>
      </FormControl>
    </Box>
  )
})

export default Registration;