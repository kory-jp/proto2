import { Button } from "@chakra-ui/button";

export const PrimaryButton = (props) => {
  const  {children, onClick, disabled = false, loading = false} = props;
  return(
    <Button
      bg="gray.400"
      color="white"
      fontSize={{base: "sm", md: "lg"}}
      isLoading={loading}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}