const initialState = {
  loading: {
    status: false
  },
  
  users: {
    logged_in: false,
    id: '',
    name: '',
    email: '',
    password: '',
  },

  posts: {
    list: [],
  }
}

export default initialState;