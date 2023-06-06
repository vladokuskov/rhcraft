export default function BlogDetailLoading() {
  return (
    <div className="w-full h-full flex flex-col gap-2 p-4 py-16 max-w-[80rem] mx-auto my-0">
      <div className="w-full max-w-[50rem] max-sm:h-60 h-96 bg-neutral-700 rounded animate-pulse mt-8`" />
      <div className="flex items-center justify-start gap-2">
        <div className=" w-12 rounded-full mt-4 h-12 p-3 bg-neutral-700 animate-pulse" />
        <div className="w-64 mt-4 p-3 bg-neutral-700 rounded animate-pulse" />
      </div>
      <div className=" w-full max-w-[50rem]  rounded mt-4 h-12 p-3 bg-neutral-700 animate-pulse" />
      {[...Array(20)].map((i) => (
        <div
          key={i}
          className="w-full max-w-[50rem] mt-2 p-3 bg-neutral-700 rounded animate-pulse"
        />
      ))}
    </div>
  )
}
