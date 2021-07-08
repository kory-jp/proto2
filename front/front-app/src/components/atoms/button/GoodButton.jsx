import { Button } from "@chakra-ui/react"
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

export const GoodButton = (props) => {
  const {onClick, favorite, loadingState } = props
  return(
    <Button
      onClick={onClick} 
      colorScheme={favorite? "blue" : "gray" }
      fontSize="15px"
      w="85px"
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