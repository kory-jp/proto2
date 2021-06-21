import React, { memo } from 'react'
import { Flex, Text } from '@chakra-ui/layout'
import { Image, Link } from "@chakra-ui/react"
import { useDispatch, useSelector } from 'react-redux'
import { getUserId } from '../../../reducks/users/selectors'
import { push } from 'connected-react-router'
import CreateIcon from '@material-ui/icons/Create';

export const PostShowCard = memo((props)=> {
  const dispatch = useDispatch()
  const {id, user_id, name, title, image, content, created_at} = props.post;
  const selector = useSelector((state) => state);
  const currentUser_id = getUserId(selector);
  return(
    <Flex flexDirection="column" bg="white" borderRadius="md" shadow="md" p="2" w="full">
      <Flex w="full">
        <Image 
          src={image}
          boxSize="md"
          objectFit="cover"
          shadow="md"
          borderRadius="md"
          m="2"
        />
        <Flex flexDirection="column" pl="4" shadow="md" borderRadius="md" w="full" m="2">
          <Text as="h2" fontWeight="bold" fontSize="lg">{title}</Text>
          { 
            user_id === currentUser_id ? (
              <Link
                onClick={()=> dispatch(push(`/posts/edit/${id}`))}
                fontSize="md"
              >
                <CreateIcon fontSize="small"/>
                編集
              </Link>
            ): null
          }
          <Flex justifyContent="space-between" pt="2">
            <Text>{name}</Text>
            <Text>{created_at}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex shadow="md" borderRadius="md" p="2" mt="2">
        <Text>{content}</Text>
      </Flex>
    </Flex>
  )
})

export default PostShowCard;