import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@chakra-ui/spinner";
import { Box, Center } from '@chakra-ui/layout';
import {push} from 'connected-react-router';
import useLoadingState from "../../../hooks/useLoadingState";
import CommentShowCard from "./CommentShowCard";
import useReturnTop from "../../../hooks/useReturnTop";
import usePagination from "../../../hooks/usePagination";
import DefaultPagination from "../../molecules/DefaultPagination";

export const CommentsShow = (props) => {
  const sumPage = props.sumPage
  const dispatch = useDispatch()
  const loadingState = useLoadingState()
  const {queryPage} = usePagination()
  const returnTop  = useReturnTop()
  
  const postId = useSelector((state)=> state.posts.id)
  const comments = useSelector((state)=> state.comments.list)

  const changeCurrentPage = (e, page) =>{
    dispatch(push(`/posts/show/${postId}?page=${page}`))
    returnTop()
  }
  return(
    <>
    { loadingState? (
      <Center  h="100vh" w={{base: "50vh", md: "100vh"}}>
        <Spinner/>
      </Center>
    ): (
      <>
        {comments.length > 0 && (
          <Box mr="2" ml="2" mb="2">
            {
              comments.map(comment =>(
                <CommentShowCard key={comment.id} commentData={comment} />
              ))
            }
          </Box>
        )}
        <DefaultPagination 
          count={sumPage}
          onChange={changeCurrentPage}
          page={queryPage}
        />
      </>
    )}
  </>
  )
}

export default CommentsShow;