import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import usePagination from "../../../hooks/usePagination";
import { DefaultFlex, DefaultTitleText } from "../../../assets/style/chakraStyles";
import { getMyFollowers } from "../../../reducks/users/operations";
import FollowLayout from "../../organisms/follow/FollowLayout";
import useMessage from "../../../hooks/useMessage";
import { loggedInStatus } from "../../../reducks/currentUser/operations";

export const Followers = () => {
  const dispatch = useDispatch()
  const showMessage = useMessage()
  const { setSumPage, queryPage } = usePagination()

  useEffect(()=> {
    dispatch(loggedInStatus(showMessage))
    dispatch(getMyFollowers(queryPage, setSumPage))
  },[dispatch, queryPage, setSumPage, showMessage])

  const followers = useSelector(state => state.users.list)

  return(
    <>
      <DefaultFlex mb="5">
        <DefaultTitleText
          ml="auto"
          mr="auto"
        >
          フォロワー一覧
        </DefaultTitleText>
      </DefaultFlex>
    <FollowLayout users={followers}/>
  </>
  )
}

export default Followers;