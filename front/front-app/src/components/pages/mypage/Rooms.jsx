import { Center, Spinner } from "@chakra-ui/react";
import axios from "axios"
import { push } from "connected-react-router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DefaultFlex, DefaultTitleText } from "../../../assets/style/chakraStyles";
import useLoadingState from "../../../hooks/useLoadingState";
import usePagination from "../../../hooks/usePagination";
import useReturnTop from "../../../hooks/useReturnTop";
import { nowLoadingAction } from "../../../reducks/loading/actions";
import DefaultPagination from "../../molecules/DefaultPagination";
import RoomCard from "../../organisms/directMessage/RoomCard";

export const Rooms = () => {
  const loadingState = useLoadingState()
  const dispatch = useDispatch()
  const returnTop = useReturnTop()
  const [rooms, setRooms] = useState({})
  const {sumPage, setSumPage, queryPage} = usePagination()

  const getRoomList = useCallback((queryPage, setSumPage)=> {
    dispatch(nowLoadingAction(true));
    axios
      .get(
        `http://localhost:3001/api/v1/user/rooms?page=${queryPage}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
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
    getRoomList(queryPage, setSumPage)
  },[queryPage, getRoomList, setSumPage])

  const changeCurrentPage = useCallback((e, page) =>{
    dispatch(push( `http://localhost:3001/api/v1/user/rooms?page=${queryPage}`))
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