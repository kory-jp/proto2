import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Spinner } from "@chakra-ui/spinner";
import { Box, Center } from '@chakra-ui/layout';
import { nowLoadingAction } from "../../../reducks/loading/actions";
import { getPostsAction } from "../../../reducks/posts/actions";
import { getUsersAction } from "../../../reducks/users/actions";
import { useCallback, useEffect } from "react";
import usePagination from "../../../hooks/usePagination";
import useLoadingState from "../../../hooks/useLoadingState";
import PostCard from "../../organisms/post/PostCard";
import UsersCard from "../../organisms/users/UsersCard";
import DefaultPagination from "../../molecules/DefaultPagination";
import { push } from "connected-react-router";
import useReturnTop from "../../../hooks/useReturnTop";
import { DefaultBox, DefaultTitleText } from "../../../assets/style/chakraStyles";

export const SearchResult = () => {
  const {search} = useLocation();
  const query = new URLSearchParams(search);
  const model = query.get("model")
  const keyword = query.get("keyword")
  const dispatch = useDispatch()
  const loadingState = useLoadingState()
  const returnTop = useReturnTop()
  const {sumPage, setSumPage, queryPage} = usePagination()

  const SearchKeywordGetResults = useCallback(() => {
    return async (dispatch) => {
      dispatch(nowLoadingAction(true));
      axios
        .post(
          "http://localhost:3001/api/v1/user/search",
          {
            search: {
              model: model,
              value: keyword,
            }
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          const datas = response.data;
          const page_length = response.data.page_length;
          setSumPage(page_length);
          if (datas.posts) {
            dispatch(getPostsAction(datas.posts));
          } else if (datas.users) {
            dispatch(getUsersAction(datas.users));
          }
        })
        .catch((error) => {
          console.log("error res:", error);
        })
        .finally(() => {
          dispatch(nowLoadingAction(false));
        });
    };
  },[keyword, model, setSumPage]);

  useEffect(()=> {
    dispatch(SearchKeywordGetResults())
  },[dispatch, SearchKeywordGetResults])

  const posts = useSelector((state)=> state.posts.list)
  const users = useSelector((state)=> state.users.list)

  const changeCurrentPage = (e, page) =>{
    dispatch(push(`/searchResult?model=${model}&keyword=${keyword}&page=${page}`))
    returnTop()
  }

  if(model==="post") {
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
                <DefaultTitleText>
                  「{keyword}」の検索結果
                </DefaultTitleText>
              </DefaultBox>
              {posts.length > 0 && (
                <Box mr="2" ml="2" mb="2">
                  {
                    posts.map(post =>(
                      <PostCard key={post.id} post={post}/>
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
  } else if(model==="user"){
    return(
      <>
        <DefaultBox mb="5">
          <DefaultTitleText>
            「{keyword}」の検索結果
          </DefaultTitleText>
        </DefaultBox>
        {users.length > 0 && (
          <Box mr="2" ml="2" mb="2">
            {
              users.map(user =>(
                <UsersCard key={user.id} user={user}/>
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
}

export default SearchResult;