import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dev.imateam.us:8443/",
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem("auth");
      if (token) {
        headers.set("authorization", `Token ${JSON.parse(token)}`);
      }
      console.log(headers);
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Post",
    "Comment",
    "Teams",
    "teamMembers",
    "memberInfo",
    "memberPosts",
    "loadFans",
  ],
  endpoints: () => ({}),
});
