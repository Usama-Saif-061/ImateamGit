import { baseApi } from "./baseApi";
const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (page) => ({
        url: `posts/?pageNumber=${page}`,
      }),
      providesTags: ["Post"],
    }),
    getComments: builder.query({
      query: (id) => ({
        url: `posts/comments/${id}/`,
      }),
      invalidatesTags: ["Comment"],
    }),
    getCommentsReplies: builder.query({
      query: (id) => ({
        url: `comments/replies/${id}/`,
      }),
      invalidatesTags: ["CommentReplies"],
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "posts",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["Post"],
    }),
    addNewComment: builder.mutation({
      query: (id, body1) => ({
        url: `posts/comments/${id}/`,
        method: "POST",
        body: body1,
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPostsQuery,
  useAddNewPostMutation,
  useGetCommentsQuery,
  useAddNewCommentMutation,
  useGetCommentsRepliesQuery,
} = postsApi;
