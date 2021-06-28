// ユーザーID取得のためのHooks

import { useSelector } from "react-redux"

export const useGetCurrentUserId = () => {
  const currentUserId = useSelector((state) => state.currentUser.id)
  return currentUserId
}

export default useGetCurrentUserId;