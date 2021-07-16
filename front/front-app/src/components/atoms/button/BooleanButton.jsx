import { Button } from "@chakra-ui/react"

export const BooleanButton = (props) => {
  const {onClick, colorBoolean, loadingState, children } = props
  return(
    <Button
      onClick={onClick} 
      colorScheme={colorBoolean? "blue" : "gray" }
      fontSize={{base: "11px", md: "15px"}}
      w={{base: "60px", md: "85px"}}
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