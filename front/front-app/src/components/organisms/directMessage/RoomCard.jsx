import { Box, Flex, Image } from "@chakra-ui/react";
import { DefaultFlex, DefaultText, DefaultTitleText } from "../../../assets/style/chakraStyles";
import defaultUserIcon from "../../../assets/img/defaultUserIcon.jpeg"
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import useReturnTop from "../../../hooks/useReturnTop";

export const RoomCard = (props) => {
  const {id, nickname, icon, message} = props.room;
  const dispatch = useDispatch()
  const returnTop = useReturnTop()

  const editStringLength = useCallback((string)=> {
    if(string) {
      const max_length = 30;
      if(string.length > max_length) {
          return string.substr(0, max_length) + '...'
      }
    }
    return string
  },[])

  const editMessage = useMemo(()=> editStringLength(message[0]),[editStringLength, message])

  const toRoom = useCallback(()=> {
    dispatch(push(`/room/${id}`))
    returnTop()
  },[id, dispatch, returnTop])

  return(
    <DefaultFlex w="100%" mb="2">
      <Flex> 
        <Image 
          src={icon.url? icon.url : defaultUserIcon}
          alt="投稿画像"
          mr={{base: "6", md: "10"}}
          boxSize={{base: '16', md: '24'}}
          shadow="md"
          objectFit="cover"
          borderRadius="full"
          onClick={toRoom}
          cursor="pointer"
        />
      </Flex>
      <Flex flexDirection="column" bg="aliceblue" w="full" p="2" borderRadius="md" shadow="md">
        <DefaultTitleText 
          mb="3"
          onClick={toRoom}
          cursor="pointer"
        >
          {nickname}
        </DefaultTitleText>
        <Box>
          <DefaultText>
            {editMessage}
          </DefaultText>
        </Box>
      </Flex>
    </ DefaultFlex>
  )
}

export default RoomCard;