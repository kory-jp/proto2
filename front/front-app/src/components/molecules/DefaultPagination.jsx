import Pagination from '@material-ui/lab/Pagination';

export const DefaultPagination = (props) => {
  const {count, onChange, page} = props;
  return(
    <Pagination
      count={count}
      onChange={onChange}
      page={page}
      variant="outlined" 
      color="primary"
    />
  )
}

export default DefaultPagination;