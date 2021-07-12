import { Box } from '@chakra-ui/react';
import Pagination from '@material-ui/lab/Pagination';

export const DefaultPagination = (props) => {
  const {count, onChange, page} = props;
  return(
    <Box mt="4">
      <Pagination
        count={count}
        onChange={onChange}
        page={page}
        variant="outlined" 
        color="primary"
      />
    </Box>
  )
}

export default DefaultPagination;