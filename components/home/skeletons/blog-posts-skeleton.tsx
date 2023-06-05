const BlogPostsLoading = () => {
  return (
    <div className="flex flex-wrap items-start justify-start gap-8 w-full p-2 pl-0 ">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="w-full h-[16rem] rounded flex flex-col items-start justify-center max-w-[19rem] max-sm:max-w-full max-sm:min-w-full min-w-[19rem] z-10 bg-neutral-700 animate-pulse"
        />
      ))}
    </div>
  )
}

export default BlogPostsLoading
