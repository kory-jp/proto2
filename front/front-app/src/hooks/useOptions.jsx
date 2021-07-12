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
      {id: tagOption.id, value: tagOption.value, label: tagOption.label }
    ))
  )
  return options
}

export default useOptions;