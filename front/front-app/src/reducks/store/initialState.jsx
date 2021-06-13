const initialState = {
  loading: {
    state: false
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
    email: '',
    password: '',
  }
}

export default initialState;