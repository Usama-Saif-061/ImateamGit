import { baseApi } from "./baseApi";

const teamsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: () => ({
        url: "organizations/",
      }),
      providesTags: ["Teams"],
    }),
    getTeamMembers: builder.query({
      query: (id) => ({
        url: `organizations/members/${id}/`,
      }),
      providesTags: ["teamMembers"],
    }),
    getMemberInfo: builder.query({
      query: (id) => ({
        url: `accounts/user-vanity/${id}/`,
      }),
      providesTags: ["memberInfo"],
    }),
    getMemberPosts: builder.query({
      query: (id, page) => ({
        url: `posts/vanity/${id}/?pageNumber=${page}`,
      }),
      providesTags: ["memberPosts"],
    }),
    UploadTeamAvatar: builder.mutation({
      query: (id, body) => ({
        url: `organizations/member/${id}/`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Teams"],
    }),
    deleteTeam: builder.mutation({
      query: (body) => ({
        url: "organizations/",
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["Teams", "loadFans"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetTeamsQuery,
  useGetTeamMembersQuery,
  useGetMemberInfoQuery,
  useGetMemberPostsQuery,
  useUploadTeamAvatarMutation,
  useDeleteTeamMutation,
} = teamsApi;
