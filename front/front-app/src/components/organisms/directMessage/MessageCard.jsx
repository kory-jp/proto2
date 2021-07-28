import { Box, Divider, Flex } from "@chakra-ui/react"
import { DefaultImage, DefaultText, DefaultUserIconImage } from "../../../assets/style/chakraStyles"
import defaultUserIcon from "../../../assets/img/defaultUserIcon.jpeg"
import useGetCurrentUserId from "../../../hooks/useGetCurrentUserId"

export const MessageCard = (props) => {
  const {message} = props
  const currentUserId = useGetCurrentUserId()
  const { user_id, icon, content, image, created_at} = message
  return(
    <Flex
      bg="blue.200"
      m="2"
      p="2"
      { ...currentUserId === user_id ? {ml: "40%"} : null}
      borderRadius="3xl"
      w="60%"
      shadow="lg"
    >
      {
        currentUserId !== user_id ? (
          <DefaultUserIconImage 
            src={icon.url? icon.url : defaultUserIcon}
            boxSize={{ base: "20px", md: "30px" }}
            // onClick={toUserinfoPage}
            cursor="pointer"
          />
        ) : null
      }
      <Box w="100%" pl={{base: "2", md: "4"}} >
        <DefaultText >{content}</DefaultText>
        {
          image.url ? (
            <DefaultImage 
              src={image.url}
              boxSize={{ base: "16", md: "40" }}
              minH="none"
              minw="none"
            />
          ) : null
        }
        <Divider mt="2" mb="2" w="100%"/>
        <DefaultText
          fontSize={{base: "x-small", md: "sm"}}
        >
          {created_at}
        </DefaultText>
      </Box>
    </Flex>
  )
}

export default MessageCard;