const BlogPostsLoading = () => {
  return (
    <div className="flex flex-wrap items-start justify-start gap-8 w-full p-2 pl-0 ">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="w-full max-w-[20rem] max-sm:max-w-full max-sm:min-w-full min-w-[19rem] h-[16.5rem] rounded flex flex-col items-start justify-center z-10 bg-neutral-700 animate-pulse"
        />
      ))}
    </div>
  )
}

export default BlogPostsLoading
