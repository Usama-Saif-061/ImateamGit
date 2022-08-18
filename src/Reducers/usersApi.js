import { baseApi } from "./baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: `accounts/user-info/`,
      }),
      providesTags: ["User"],
    }),
    getFans: builder.query({
      query: (id) => ({
        url: `posts/connections/${id}/`,
      }),
      providesTags: ["loadFans"],
    }),
    updateFans: builder.mutation({
      query: (id, body) => ({
        url: `posts/connections/${id}/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["loadFans"],
    }),
    followFan: builder.mutation({
      query: (patch, id) => ({
        url: `posts/connections/${id}/`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["loadFans"],
    }),
    unFollowFan: builder.mutation({
      query: (patch, id) => ({
        url: `posts/connections/${id}/`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["loadFans"],
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: "accounts/user-avatar/",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUserQuery,
  useGetFansQuery,
  useUpdateFansMutation,
  useFollowFanMutation,
  useUnFollowFanMutation,
  useUpdateProfileMutation,
} = usersApi;
