import { PostSearch } from './post-search'

const BlogSidebar = () => {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-4">
      <h2 className=" text-white text-3xl font-tabloid tracking-wider">BLOG</h2>
      <PostSearch />
    </div>
  )
}

export default BlogSidebar
