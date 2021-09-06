import { Center, Spinner } from "@chakra-ui/react";
import axios from "axios"
import { push } from "connected-react-router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DefaultFlex, DefaultTitleText } from "../../../assets/style/chakraStyles";
import useLoadingState from "../../../hooks/useLoadingState";
import useMessage from "../../../hooks/useMessage";
import usePagination from "../../../hooks/usePagination";
import useReturnTop from "../../../hooks/useReturnTop";
import { loggedInStatus } from "../../../reducks/currentUser/operations";
import { nowLoadingAction } from "../../../reducks/loading/actions";
import DefaultPagination from "../../molecules/DefaultPagination";
import RoomCard from "../../organisms/directMessage/RoomCard";

export const Rooms = () => {
  const loadingState = useLoadingState()
  const dispatch = useDispatch()
  const showMessage = useMessage()
  const returnTop = useReturnTop()
  const [rooms, setRooms] = useState({})
  const {sumPage, setSumPage, queryPage} = usePagination()

  const getRoomList = useCallback((queryPage, setSumPage)=> {
    dispatch(nowLoadingAction(true));
    const apiURL =
    process.env.REACT_APP_USERS_API_URL +
    `rooms?page=${queryPage}`;
    axios
      .get(
        apiURL,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        response.data.rooms.sort((a, b)=> {
          if(b.created_at < a.created_at) return -1;
          if(b.created_at > a.created_at) return 1;
          return 0;
        })
        setRooms(response.data.rooms);
        const page_length = response.data.page_length;
        setSumPage(page_length);
      })
      .catch((error) => {
        console.log("error:", error);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(nowLoadingAction(false));
        }, 800);
      });
  },[dispatch])

  useEffect(()=> {
    dispatch(loggedInStatus(showMessage))
    getRoomList(queryPage, setSumPage)
  },[queryPage, getRoomList, setSumPage, dispatch, showMessage])

  const changeCurrentPage = useCallback((e, page) =>{
    const apiURL =
    process.env.REACT_APP_USERS_API_URL +
    `rooms?page=${queryPage}`;
    dispatch(push(apiURL))
    returnTop()
  },[dispatch, queryPage, returnTop])
  
  return(
    <>
      <DefaultFlex mb="4">
        <DefaultTitleText
          mr="auto"
          ml="auto"
        >
          チャットルーム一覧
        </DefaultTitleText>
      </DefaultFlex>
      { 
        loadingState? (
          <Center  h="100vh" w={{base: "50vh", md: "100vh"}}>
            <Spinner/>
          </Center>
        ): (
          <>
            {
              rooms ? (
                rooms.length > 0 ? (
                  rooms.map(room => (
                    <RoomCard key={room.id} room={room}/>
                  ))
                ) : null
              ) : null
            }
          </>
        ) 
      }
      <DefaultPagination 
        count={sumPage}
        onChange={changeCurrentPage}
        page={queryPage}
      />
    </>
  )
}

export default Rooms;