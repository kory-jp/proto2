import { useState } from "react"
import { useLocation } from "react-router"

export const usePagination = () => {
  const [sumPage, setSumPage ] = useState(1)

  const {search} = useLocation()
  const query = new URLSearchParams(search);
  const queryPageStr = query.get("page")
  const queryPage = Number(queryPageStr)
  return { sumPage, setSumPage ,queryPage}
}

export default usePagination;