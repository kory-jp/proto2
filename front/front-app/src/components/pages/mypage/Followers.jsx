import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import usePagination from "../../../hooks/usePagination";
import { DefaultBox, DefaultTitleText } from "../../../assets/style/chakraStyles";
import { getMyFollowers } from "../../../reducks/users/operations";
import FollowLayout from "../../organisms/follow/FollowLayout";

export const Followers = () => {
  const dispatch = useDispatch()
  const { setSumPage, queryPage } = usePagination()

  useEffect(()=> {
    dispatch(getMyFollowers(queryPage, setSumPage))
  },[dispatch, queryPage, setSumPage])

  const followers = useSelector(state => state.users.list)

  return(
    <>
      <DefaultBox mb="5">
        <DefaultTitleText>
          フォロワー一覧
        </DefaultTitleText>
      </DefaultBox>
    <FollowLayout users={followers}/>
  </>
  )
}

export default Followers;