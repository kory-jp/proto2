const initialState = {
  loading: {
    status: false
  },
  
  users: {
    logged_in: false,
    id: '',
    name: '',
    nickname: '',
    email: '',
    password: '',
    introduction: '',
    image: ''
  },

  posts: {
    list: [],
  }
}

export default initialState;