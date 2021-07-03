import { Button } from "@chakra-ui/button";

export const DeleteButton = (props) => {
  const  {children, onClick, disabled = false, loading = false, w } = props;
  return(
    <Button
      bg="gray.100"
      color="red"
      w={w}
      _hover={{
        bg: "red.400",
        color: "white"
      }}
      fontSize={{base: "sm", md: "lg"}}
      isLoading={loading}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default DeleteButton;