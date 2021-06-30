const initialState = {
  loading: {
    status: false
  },
  
  currentUser: {
    // logged_in: false,
    id: '',
    name: '',
    nickname: '',
    email: '',
    password: '',
    introduction: '',
    image: ''
  },

  users: {
    list: [],
  },

  posts: {
    list: [],
  }
}

export default initialState;