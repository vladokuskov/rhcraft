'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { Post } from '@prisma/client'
import PostCard from '../post-card'
import { useFilterContext } from '@/app/context/filter.context'

type PostsQueryParams = {
  take?: number
  lastCursor?: string
  date: Date | null
}

const allPosts = async ({ take, lastCursor, date }: PostsQueryParams) => {
  const response = await axios.get('/api/postsauth', {
    params: { take, lastCursor, date },
  })
  return response?.data
}

const DashboardPostsList = () => {
  const { ref, inView } = useInView()
  const { date } = useFilterContext()

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryFn: ({ pageParam = '' }) =>
      allPosts({ take: 10, lastCursor: pageParam, date: date }),
    queryKey: ['posts', date],

    getNextPageParam: (lastPage) => {
      return lastPage?.metaData.lastCursor
    },
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, inView, fetchNextPage, date])

  return (
    <ul className="flex flex-wrap items-start justify-start gap-8 w-full p-2 pl-0 ">
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

      {isLoading || (isFetchingNextPage && !isSuccess) ? (
        <p>Loading</p>
      ) : (
        data?.pages.length === 0 && (
          <p className="text-center font-sans text-neutral-600 font-semibold">
            There are no posts.
          </p>
        )
      )}
    </ul>
  )
}

export default DashboardPostsList as unknown as () => JSX.Element
