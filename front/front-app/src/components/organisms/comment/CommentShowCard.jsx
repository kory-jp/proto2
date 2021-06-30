import { Box, Flex } from "@chakra-ui/layout";
import { DefaultFlex, DefaultText, DefaultUserIconImage } from "../../../assets/style/chakraStyles";
import defaultUserIcon from "../../../assets/img/defaultUserIcon.jpeg"

export const CommentShowCard = ( commentData ) => {
  const {name, nickname, icon, comment} = commentData.commentData;
  return(
    <DefaultFlex flexDirection="column" w="100%" mb="4">
      <Flex w="100%">
        <DefaultUserIconImage 
          src={icon.url? icon.url : defaultUserIcon}
          mr="4"
        />
        <DefaultText>
          {nickname? nickname : name}
        </DefaultText>
      </Flex>
      <Flex mt="4">
        {comment}
      </Flex>
    </DefaultFlex>
  )
}

export default CommentShowCard;