import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import useGetCurrentUserId from "../../hooks/useGetCurrentUserId"
import useMessage from "../../hooks/useMessage"
import usePagination from "../../hooks/usePagination"
import { loggedInStatus } from "../../reducks/currentUser/operations"
import { getRoom } from "../../reducks/rooms/operations"
import DMInputForm from "../organisms/directMessage/DMInputForm"
import { DMShowArea } from "../organisms/directMessage/DMShowArea"

export const Room = () => {
  const roomId = useParams()
  const dispatch = useDispatch()
  const showMessage = useMessage()
  const currentUserId = useGetCurrentUserId()
  const {sumPage, setSumPage, queryPage} = usePagination()

  useEffect(()=> {
    dispatch(loggedInStatus(showMessage))
    dispatch(getRoom(roomId, setSumPage, queryPage))
  },[dispatch, roomId, queryPage, setSumPage, showMessage])

  const room = useSelector((state)=> state.room)

  return(
    <>
      <DMShowArea room={room} currentUserId={currentUserId} sumPage={sumPage} queryPage={queryPage}/>
      <DMInputForm roomId={room.id} setSumPage={setSumPage} queryPage={queryPage}/>
    </>
  )
}

export default Room;