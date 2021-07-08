import { Button } from "@chakra-ui/react"
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

export const GoodButton = (props) => {
  const {onClick, favorite, loadingState } = props
  return(
    <Button
      onClick={onClick} 
      colorScheme={favorite? "blue" : "gray" }
      fontSize={{base: "10px", md: "15px"}}
      w={{base: "60px", md: "85px"}}
      h={{base: "30px", md: "45px"}}
      outline="none"
      disabled={loadingState}
      mb="2"
    >
      Good!
      <ThumbUpIcon style={{fontSize: 15, marginLeft: 5}}/>
    </Button>
  )
}

export default GoodButton;