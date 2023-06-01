'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'

import { Post } from '@prisma/client'
import PostCard from '../post-card'
import BlogPostsLoading from './skeletons/blog-posts-skeleton'
import { useSearchContext } from '@/app/context/search.context'

type PostsQueryParams = {
  take?: number
  lastCursor?: string
  searchQuery?: string
}

const allPosts = async ({
  take,
  lastCursor,
  searchQuery,
}: PostsQueryParams) => {
  const response = await axios.get('/api/posts', {
    params: { take, lastCursor, searchQuery },
  })
  return response?.data
}

const BlogPostsList = () => {
  const { ref, inView } = useInView()

  const { query, setQuery } = useSearchContext()

  const [searchedPosts, setSearchedPosts] = useState<Post[] | null>(null)

  console.log(searchedPosts)

  const searchPosts = async (query: string) => {
    setSearchedPosts(null)

    const response = await allPosts({ take: 1, searchQuery: query })

    if (response?.length) {
      setSearchedPosts(response)
    }
  }

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
    if (query.length > 0) {
      searchPosts(query)
    } else if (!searchedPosts && inView && hasNextPage) {
      fetchNextPage()
    }
  }, [query, searchedPosts, inView, hasNextPage, fetchNextPage])

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
