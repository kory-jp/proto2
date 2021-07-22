import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import usePagination from "../../../hooks/usePagination";
import { DefaultBox, DefaultTitleText } from "../../../assets/style/chakraStyles";
import { getMyFollows } from "../../../reducks/users/operations";
import FollowLayout from "../../organisms/follow/FollowLayout";

export const Follows = () => {
  const dispatch = useDispatch()
  const { setSumPage, queryPage } = usePagination()

  useEffect(()=> {
    dispatch(getMyFollows(queryPage, setSumPage))
  },[dispatch, queryPage, setSumPage])

  const follows = useSelector(state => state.users.list)

  return(
    <>
      <DefaultBox mb="5">
        <DefaultTitleText>
          フォロー一覧
        </DefaultTitleText>
      </DefaultBox>
      <FollowLayout users={follows}/>
    </>
  )
}

export default Follows;