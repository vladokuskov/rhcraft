'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'

import { Post } from '@prisma/client'
import PostCard from '../post-card'
import BlogPostsLoading from './skeletons/blog-posts-skeleton'

type PostsQueryParams = {
  take?: number
  lastCursor?: string
}

const allPosts = async ({ take, lastCursor }: PostsQueryParams) => {
  const response = await axios.get('/api/posts', {
    params: { take, lastCursor },
  })
  return response?.data
}

const BlogPostsList = () => {
  const { ref, inView } = useInView()

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryFn: ({ pageParam = '' }) =>
      allPosts({ take: 10, lastCursor: pageParam }),
    queryKey: ['posts'],

    getNextPageParam: (lastPage) => {
      return lastPage?.metaData.lastCursor
    },
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, inView, fetchNextPage])

  return (
    <ul className="flex flex-wrap items-start justify-start gap-8 w-full p-2 pl-0">
      {isSuccess &&
        data?.pages.map((page) =>
          page.data.map((post: Post, index: number) => {
            if (page.data.length === index + 1) {
              return (
                <div ref={ref} key={index}>
                  <PostCard key={post.id} post={post} />
                </div>
              )
            } else {
              return <PostCard key={post.id} post={post} />
            }
          }),
        )}

      {(isLoading || isFetchingNextPage) && <BlogPostsLoading />}
    </ul>
  )
}

export default BlogPostsList as unknown as () => JSX.Element
