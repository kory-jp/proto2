import { Divider, Flex } from "@chakra-ui/react";
import { DefaultFlex, DefaultTitleText, DefaultUserIconImage } from "../../../assets/style/chakraStyles";
import defaultUserIcon from "../../../assets/img/defaultUserIcon.jpeg"
import MessageCard from "./MessageCard";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

export const DMShowArea = (props) => {
  const {room, currentUserId} = props;
  const dispatch = useDispatch()
  const messages = room.messages
  const users = room.users

  const toUserInfoPage = useCallback((user)=> {
    dispatch(push(`/users/${user.id}`))
  },[dispatch])

  return(
    <DefaultFlex mb="4" flexDirection='column'>
      {
        users.length > 0 ? (
          users.map(user => (
            <Flex key={user.id} mr="auto" ml="auto">
              {
                (currentUserId !== user.id) ? (
                  <>
                    <DefaultUserIconImage
                      src={user.icon.url? user.icon.url : defaultUserIcon}
                      mr="4"
                      onClick={() => toUserInfoPage(user)}
                      cursor="pointer"
                    />
                    <DefaultTitleText
                      onClick={() => toUserInfoPage(user)}
                      cursor="pointer"
                    >
                      {user.nickname}
                    </DefaultTitleText>
                  </>
                ) : null
              }
            </Flex>
          ))
        ) : null
      }
      <Divider mt="4" mb="4"/>
      {
        messages.length > 0 ? (
          <DefaultFlex
            bg="gray.100"
            flexDirection='column'
          >
            {
              messages.map(message => (
                <MessageCard key={message.id} message={message}/>
              ))
            }
          </DefaultFlex>
        ) : null
      }
    </DefaultFlex>
  )
}

export default DMShowArea;