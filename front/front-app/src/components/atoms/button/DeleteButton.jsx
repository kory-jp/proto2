import { Button } from "@chakra-ui/button";

export const DeleteButton = (props) => {
  const  {children, onClick, disabled = false, loading = false, w } = props;
  // const  {children, disabled = false, loading = false } = props;
  return(
    <Button
      bg="gray.100"
      color="red"
      w={w}
      // {...props}
      _hover={{
        bg: "red.400",
        color: "white"
      }}
      fontSize={{base: "sm", md: "lg"}}
      isLoading={loading}
      // isLoading={loading === loading ? 1 : 0} 
      disabled={disabled || loading}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default DeleteButton;