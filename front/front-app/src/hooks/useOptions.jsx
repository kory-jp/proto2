import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTags } from "../reducks/tags/operations"

export const useOptions = () => {
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getTags())
  },[dispatch])

  const tagOptions = useSelector((state)=> state.tags.list)
   const options = (
    tagOptions.map(tagOption => (
      { value: tagOption.id, label: tagOption.name }
    ))
  )
  return options
}

export default useOptions;