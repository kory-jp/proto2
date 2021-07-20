import { Flex, Image } from "@chakra-ui/react"
import { DefaultFlex, DefaultText, DefaultTitleText } from "../../../assets/style/chakraStyles"
import defaultUserIcon from "../../../assets/img/defaultUserIcon.jpeg"
import { useDispatch } from "react-redux"
import useReturnTop from "../../../hooks/useReturnTop"
import { useCallback } from "react"
import { push } from "connected-react-router"
import { nowLoadingAction } from "../../../reducks/loading/actions"

export const UsersCard = (props) => {
  const { id, nickname, introduction, image} = props.user
  const dispatch = useDispatch()
  const returnTop = useReturnTop
  
  const toUserInfoPage = useCallback(() => {
    dispatch(push(`/users/${id}`))
    dispatch(nowLoadingAction(true));
    returnTop()
  },[dispatch, returnTop, id])

  return(
    <DefaultFlex w="100%" mb="2">
      <Flex>
        <Image 
          src={image.url? image.url : defaultUserIcon}
          alt="投稿画像"
          mr={{base: "6", md: "10"}}
          boxSize={{base: '16', md: '24'}}
          shadow="md"
          objectFit="cover"
          borderRadius="full"
          onClick={toUserInfoPage}
          cursor="pointer"
        />
      </Flex>
      <Flex flexDirection="column" bg="gray.100" w="full" p="2" borderRadius="md" shadow="md">
        <DefaultTitleText 
          mb="3"
          onClick={toUserInfoPage}
          cursor="pointer"
        >
          {nickname}
        </DefaultTitleText>
        <DefaultText>
          {introduction}
        </DefaultText>
      </Flex>
    </ DefaultFlex>
  )
} 

export default UsersCard;