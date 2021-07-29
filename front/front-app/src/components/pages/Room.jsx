import { Center, Spinner } from "@chakra-ui/react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import useGetCurrentUserId from "../../hooks/useGetCurrentUserId"
import useLoadingState from "../../hooks/useLoadingState"
import { getRoom } from "../../reducks/rooms/operations"
import DMInputForm from "../organisms/directMessage/DMInputForm"
import { DMShowArea } from "../organisms/directMessage/DMShowArea"



export const Room = () => {
  const roomId = useParams()
  const dispatch = useDispatch()
  const loadingState = useLoadingState()
  const currentUserId = useGetCurrentUserId()

  useEffect(()=> {
    dispatch(getRoom(roomId))
  },[dispatch, roomId])

  const room = useSelector((state)=> state.room)

  return(
    <>
      { loadingState? (
        <Center  h="100vh" w={{base: "50vh", md: "100vh"}}>
          <Spinner/>
        </Center>
        ): (
          <>
            <DMShowArea room={room} currentUserId={currentUserId}/>
          </>
        )
      }
      <DMInputForm roomId={room.id} currentUserId={currentUserId}/>
    </>
  )
}

export default Room;