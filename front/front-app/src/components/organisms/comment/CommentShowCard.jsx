import {  Flex } from "@chakra-ui/layout";
import { Divider, Stack, useDisclosure } from "@chakra-ui/react"
import CreateIcon from '@material-ui/icons/Create';
import { useCallback } from "react";
import { DefaultFlex, DefaultText, DefaultUserIconImage } from "../../../assets/style/chakraStyles";
import defaultUserIcon from "../../../assets/img/defaultUserIcon.jpeg"
import useGetCurrentUserId from "../../../hooks/useGetCurrentUserId";
import CommentEditModal from "./CommentEditModal";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import useReturnTop from "../../../hooks/useReturnTop";

export const CommentShowCard = ( props ) => {
  const commentData = props.commentData;
  const { user_id, nickname, icon, comment} = commentData;
  const currentUserId = useGetCurrentUserId()
  const { isOpen, onOpen, onClose} = useDisclosure()
  const dispatch = useDispatch()
  const returnTop = useReturnTop()

  const toUserinfoPage = useCallback(()=> {
    dispatch(push(`/users/${user_id}`))
    returnTop()
  },[dispatch, returnTop, user_id])

  return(
    <>
      <DefaultFlex flexDirection="column" w="100%" mb="4">
        <Stack spacing="4">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <DefaultUserIconImage 
                src={icon.url? icon.url : defaultUserIcon}
                mr="4"
                onClick={toUserinfoPage}
                cursor="pointer"
              />
              <DefaultText 
                mt="auto" 
                mb="auto"
                onClick={toUserinfoPage}
                cursor="pointer"
              >
                {nickname}
              </DefaultText>
            </Flex>
            <Flex>
              {
                user_id === currentUserId? (
                  <DefaultText
                    mt="auto"
                    mb="auto"
                    mr="4"
                    cursor="pointer"
                    onClick={onOpen}
                  > 
                    <CreateIcon />
                    編集
                  </DefaultText>
                ): null
              }
            </Flex>
          </Flex>
          <Divider/>
          <Flex mt="4">
            <DefaultText>
              {comment}
            </DefaultText>
          </Flex>
        </Stack>
      </DefaultFlex>
      <CommentEditModal 
        isOpen={isOpen} 
        onClose={onClose}
        commentData={commentData}
      />
    </>
  )
}

export default CommentShowCard;