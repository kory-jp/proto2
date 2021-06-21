import { Button } from "@chakra-ui/button";
import { memo } from "react";

export const PrimaryButton = memo((props) => {
  const  {children, onClick, disabled = false, loading = false} = props;
  return(
    <Button
      bg="gray.400"
      color="white"
      isLoading={loading}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {children}
    </Button>
  )
})