import {
  USER_LIST,
  POSTS,
  COUNTRY_LIST,
  TIME_ZONE,
  CURRENT_TIME,
} from "../Utils/Contants";

export const initialState = {
  users: [],
  posts: [],
  country_list: [],
  timezone: null,
  current_time: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LIST:
      return { ...state, users: action.payload };
    case POSTS:
      return { ...state, posts: action.payload };
    case COUNTRY_LIST:
      return { ...state, country_list: action.payload };
    case TIME_ZONE:
      return { ...state, timezone: action.payload };
    case CURRENT_TIME:
      return { ...state, current_time: action.payload };
    default:
      return state;
  }
};

export default reducer;
