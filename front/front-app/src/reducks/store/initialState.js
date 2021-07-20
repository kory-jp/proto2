const initialState = {
  loading: {
    status: false,
  },

  currentUser: {
    id: "",
    name: "",
    nickname: "",
    email: "",
    password: "",
    introduction: "",
    image: "",
  },

  users: {
    list: [],
  },

  posts: {
    list: [],
  },

  comments: {
    list: [],
  },

  tags: {
    list: [],
  },

  favorite: {
    status: false,
  },

  follow: {
    status: false,
  },
};

export default initialState;
