import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://dummyjson.com'}),
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, number>({
      query: (offset) => ({
        url: `/posts`, 
        params: {
          limit: 10,
          skip: offset
        }
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, response) => {
        currentCache.posts.push(...response.posts)
        currentCache.total = response.total
      },
    })
  })
})

export const { useGetPostsQuery } = api