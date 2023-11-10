import { USER_LIST, POSTS } from "../Utils/Contants";

export const initialState = {
  users: [],
  posts: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LIST:
      return { ...state, users: action.payload };
    case POSTS:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};

export default reducer;
