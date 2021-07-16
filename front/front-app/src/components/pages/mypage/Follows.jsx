import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@chakra-ui/spinner";
import { Box, Center } from '@chakra-ui/layout';
import { push } from "connected-react-router";
import { useCallback, useEffect } from "react";
import usePagination from "../../../hooks/usePagination";
import useLoadingState from "../../../hooks/useLoadingState";
import UsersCard from "../../organisms/users/UsersCard";
import DefaultPagination from "../../molecules/DefaultPagination";
import useReturnTop from "../../../hooks/useReturnTop";
import { DefaultBox, DefaultText } from "../../../assets/style/chakraStyles";
import { getFollows } from "../../../reducks/users/operations";

export const Follows = () => {
  const loadingState = useLoadingState()
  const dispatch = useDispatch()
  const returnTop = useReturnTop()
  const { sumPage, setSumPage, queryPage } = usePagination()

  useEffect(()=> {
    dispatch(getFollows())
  },[dispatch])

  const follows = useSelector(state => state.users.list)


  const changeCurrentPage = useCallback((e, page) =>{
    dispatch(push(`/mypage/follows?page=${page}`))
    returnTop()
  },[dispatch, returnTop])

  return(
    <>
    {
      loadingState? (
        <Center  h="100vh" w={{base: "50vh", md: "100vh"}}>
          <Spinner/>
        </Center>
      ):(
        <>
          <DefaultBox mb="5">
            <DefaultText>
              フォロー一覧
            </DefaultText>
          </DefaultBox>
          {follows.length > 0 && (
            <Box mr="2" ml="2" mb="2">
              {
                follows.map(follow =>(
                  <UsersCard key={follow.id} user={follow}/>
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
      )
    }
  </>
  )
}

export default Follows;