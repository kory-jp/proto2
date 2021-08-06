import { Center, Flex, Spinner } from "@chakra-ui/react";
import { push } from "connected-react-router";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DefaultFlex, DefaultTitleText } from "../../../assets/style/chakraStyles";
import useLoadingState from "../../../hooks/useLoadingState";
import usePagination from "../../../hooks/usePagination";
import useReturnTop from "../../../hooks/useReturnTop";
import { deleteAllPageNotification, getNotifications } from "../../../reducks/notifications/operations";
import DeleteButton from "../../atoms/button/DeleteButton";
import DefaultPagination from "../../molecules/DefaultPagination";
import NotificationCard from "../../organisms/notification/NotificationCard";

export const Notifications = () => {
  const dispatch = useDispatch()
  const {sumPage, setSumPage, queryPage} = usePagination()
  const loadingState = useLoadingState()
  const returnTop = useReturnTop()
  const modal = false

  useEffect(()=> {
    dispatch(getNotifications(setSumPage, queryPage))
  },[dispatch, setSumPage, queryPage])

  const notifications = useSelector((state)=> state.notifications.list)

  const changeCurrentPage = useCallback((e, page) =>{
    dispatch(push(`/notifications/?page=${page}`))
    returnTop()
  },[dispatch, returnTop])

  const onClickdeleteAllNotifications = useCallback(()=> {
    dispatch(deleteAllPageNotification(setSumPage))
  },[dispatch, setSumPage])

  return(
    <>
      <DefaultFlex mb="4">
        <DefaultTitleText ml="auto" mr="auto">通知一覧</DefaultTitleText>
        {
          notifications.length > 0 && (
            <DeleteButton
              onClick={onClickdeleteAllNotifications}
            >
              一括削除
            </DeleteButton>
          )
        }
      </DefaultFlex>
      { 
      loadingState? (
        <Center  h="100vh" w={{base: "50vh", md: "100vh"}}>
          <Spinner/>
        </Center>
      ): (
        <>
          {
            notifications.length > 0 && (
              <DefaultFlex flexDirection="column">
                {
                  notifications.map(notification => (
                    <NotificationCard 
                      key={notification.id} 
                      notification={notification} 
                      modal={modal} 
                      setSumPage={setSumPage}
                      queryPage={queryPage}
                    />
                  ))
                }
                <Flex mr="auto" ml="auto" mb="4">
                  <DefaultPagination 
                    count={sumPage}
                    onChange={changeCurrentPage}
                    page={queryPage}
                  />
                </Flex>
              </DefaultFlex>
            )
          }
        </>
      )
      }
    </>
  )
}

export default Notifications;