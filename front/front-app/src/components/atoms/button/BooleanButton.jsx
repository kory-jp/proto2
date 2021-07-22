import { Button } from "@chakra-ui/react"

export const BooleanButton = (props) => {
  const {onClick, colorBoolean, loadingState, children } = props
  return(
    <Button
      onClick={onClick} 
      colorScheme={colorBoolean? "blue" : "gray" }
      fontSize={{base: "8px", md: "15px"}}
      w={{base: "100px", md: "130px"}}
      h={{base: "30px", md: "45px"}}
      outline="none"
      disabled={loadingState}
      mb="2"
      borderRadius="full"
    >
      {children}
    </Button>
  )
}

export default BooleanButton;