import { useCallback } from "react"
import { useToast } from "@chakra-ui/toast"

export const useMessage = () => {
  const toast = useToast();
  const showMessage = useCallback((props)=> {
    const {title, status} = props;
    toast({
      title,
      status,
      position: "top",
      duration: 2000,
      isClosable: true,
    });
  },[toast])
  return showMessage;
}

export default useMessage;