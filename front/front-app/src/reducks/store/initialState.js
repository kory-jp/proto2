const initialState = {
  loading: {
    status: false,
  },

  currentUser: {
    id: "",
    name: "",
    nickname: "",
    email: "",
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

  room: {
    id: "",
    users: {
      list: [],
    },
    messages: {
      list: [],
    },
  },

  notifications: {
    list: [],
  },
};

export default initialState;
