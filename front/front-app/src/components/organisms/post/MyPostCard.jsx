import React from 'react'
import { Flex } from '@chakra-ui/layout'
import { Image, Link } from "@chakra-ui/react"
import CreateIcon from '@material-ui/icons/Create';
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router';
import defaultImage from '../../../assets/img/defaultImage.jpeg'
import { DefaultFlex, DefaultText } from '../../../assets/style/chakraStyles';
import useGetCurrentUserId from '../../../hooks/useGetCurrentUserId';

export const MyPostCard = (props)=> {
  const dispatch = useDispatch()
  const currentUserId = useGetCurrentUserId()
  const {id, user_id, title, image, created_at} = props.post;
  return(
    <DefaultFlex w="100%" mb="2">
      <Image
        src={image.url? image.url : defaultImage}
        alt="投稿画像"
        boxSize={{base: '20', md: '3xs'}}
        objectFit="cover"
        borderRadius="md"
        minW="15%"
        onClick={()=> dispatch(push('/posts/show/' + id))}
        cursor="pointer"
      />
      <DefaultFlex flexDirection="column" justifyContent="space-between" w="100%" p="2" ml="2">
        <DefaultText
          fontWeight="bold"
          onClick={()=> dispatch(push('/posts/show/' + id))}
          cursor="pointer"
        >
          {title}
        </DefaultText>
        <Flex justifyContent="space-between">
          { 
            user_id === currentUserId ? (
              <Link
                onClick={()=> dispatch(push(`/posts/edit/${id}`))}
                fontSize={{base: "sm", md: "lg"}}
              >
                <CreateIcon fontSize="small"/>
                編集
              </Link>
            ): null
          }
          <DefaultText>{created_at}</DefaultText>
        </Flex>
      </DefaultFlex>
    </DefaultFlex>
  )
}

export default MyPostCard;