const initialState = {
  loading: {
    status: false
  },
  
  currentUser: {
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
  },

  comments: {
    list: [],
  }
}

export default initialState;