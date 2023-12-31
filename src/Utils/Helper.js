import axios from "axios";
import {
  POSTS,
  USER_LIST,
  COUNTRY_LIST,
  CURRENT_TIME,
  LOADING,
} from "./Contants";
import { POSTS_URL, TIME_ZONE_URL, USERS_URL } from "./Endpoints";

export const getPostsLength = (data, userId) => {
  return data?.filter((post) => post.userId === userId)?.length || 0;
};

export const getData = async (url, title, dispatch) => {
  dispatch({
    type: LOADING,
    payload: {
      title,
      isLoading: true,
    },
  });
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      dispatch({
        type: LOADING,
        payload: {
          title,
          isLoading: false,
        },
      });
    }
    return response.data;
  } catch (error) {
    dispatch({
      type: LOADING,
      payload: {
        title,
        isLoading: false,
      },
    });
    alert(`Error fetching ${title} data:`, error);
  }
};

export const fetchUsers = async (dispatch) => {
  const data = await getData(USERS_URL, "Users", dispatch);
  dispatch({ type: USER_LIST, payload: data });
};

export const fetchUserPosts = async (dispatch) => {
  const data = await getData(POSTS_URL, "Posts", dispatch);
  dispatch({ type: POSTS, payload: data });
};

export const fetchCountryList = async (dispatch) => {
  const data = await getData(TIME_ZONE_URL, "Country List", dispatch);
  dispatch({ type: COUNTRY_LIST, payload: data });
};

export const getCurrentTime = async (dispatch, timezone) => {
  const data = await getData(
    `${TIME_ZONE_URL}/${timezone}`,
    "current time",
    dispatch,
  );

  dispatch({ type: CURRENT_TIME, payload: data });
};
