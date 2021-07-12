import { Button } from "@chakra-ui/button";

export const DefaultButton = (props) => {
  const  {children, disabled = false, isLoading = false} = props;
  return(
    <Button
      fontSize={{base: "sm", md: "lg"}}
      isLoading={isLoading}
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
    </Button>
  )
}

export default DefaultButton;