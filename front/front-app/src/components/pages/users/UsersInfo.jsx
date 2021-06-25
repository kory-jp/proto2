import { useParams } from "react-router";

export const UsersInfo = () => {
  const userId = useParams();
  return(
    <p>ユーザー情報</p>
  )
}

export default UsersInfo;