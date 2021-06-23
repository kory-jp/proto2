const initialState = {
  loading: {
    status: false
  },

  message: {
    position: "top",
    duration: 2000,
    isClosable: true,
    title: "",
    status: "info",
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