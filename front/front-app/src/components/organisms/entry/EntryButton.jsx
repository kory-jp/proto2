import axios from "axios";
import { push } from "connected-react-router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import useGetCurrentUserId from "../../../hooks/useGetCurrentUserId";
import usePagination from "../../../hooks/usePagination";
import { createRoom } from "../../../reducks/rooms/operations";
import BooleanButton from "../../atoms/button/BooleanButton";

export const EntryButton = () => {
  const userId = useParams();
  const currentUserId = useGetCurrentUserId()
  const [isRoom, setIsRoom] = useState(false)
  const [roomId, setRoomId] = useState('')
  const {setSumPage} = usePagination()
  const dispatch = useDispatch()
  
  // 既存のルームがあるか確認
  const checkIsRoom = useCallback(()=> {
    axios
      .post(
        "http://localhost:3001/api/v1/user/entries/check",
        userId,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const res = response.data.entries.isRoom
        if (res) {
          setIsRoom(res)
          setRoomId(response.data.entries.room_id)
        } else {
          setIsRoom(res)
        }
      })
      .catch((error) => {
        console.log("error:", error);
      })
  },[userId])
  
  useEffect(()=> {
    checkIsRoom()
  },[checkIsRoom])

  const toRoom = useCallback(()=> {
    if(isRoom) {
      dispatch(push(`/room/${roomId}`))
    } else {
      dispatch(createRoom(userId, setSumPage))
    }
  },[isRoom, roomId, userId, dispatch, setSumPage])

  return(
    <>
      {
        Number(userId.id) !== currentUserId
          ? (
            <BooleanButton
              colorBoolean={isRoom}
              onClick={toRoom}
            >
              {
                isRoom ? (
                  <>
                    チャットを再開
                  </>
                ) : (
                  <>
                    チャットを開始
                  </>
                )
              }
            </BooleanButton>
          )
          : null
      }
    </>
  )
}

export default EntryButton;