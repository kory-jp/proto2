// ユーザーID取得のためのHooks

import { useSelector } from "react-redux"

export const useGetUserId = () => {
  const userId = useSelector((state) => state.users.id)
  return userId
}

export default useGetUserId;