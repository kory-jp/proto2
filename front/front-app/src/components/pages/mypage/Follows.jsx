import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import usePagination from "../../../hooks/usePagination";
import { DefaultFlex, DefaultTitleText } from "../../../assets/style/chakraStyles";
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
      <DefaultFlex mb="5">
        <DefaultTitleText
          ml="auto"
          mr="auto"
        >
          フォロー一覧
        </DefaultTitleText>
      </DefaultFlex>
      <FollowLayout users={follows}/>
    </>
  )
}

export default Follows;