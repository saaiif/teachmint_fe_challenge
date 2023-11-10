import axios from "axios";

export const getPostsLength = (data, userId) => {
  return data?.filter((post) => post.userId === userId)?.length || 0;
};

export const getData = async (url, title) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${title} data:`, error);
  }
};
