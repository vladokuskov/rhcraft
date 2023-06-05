export default function DashboardEditingLoading() {
  return (
    <div className="w-full flex flex-col max-w-[80rem] mx-auto my-0">
      <div className="w-full flex items-end justify-end gap-2">
        {[...Array(2)].map((i) => (
          <div
            key={i}
            className=" p-2 bg-neutral-700 py-6 px-10 rounded animate-pulse"
          />
        ))}
      </div>
      <div className="w-full h-96 l max-w-2xl bg-neutral-700 rounded animate-pulse mt-8" />
      <div className="w-full max-w-[22rem] mt-4 h-10 bg-neutral-700 rounded animate-pulse" />
      <div className="w-full mt-4 h-14 bg-neutral-700 rounded animate-pulse" />
      {[...Array(20)].map((i) => (
        <div
          key={i}
          className="w-full mt-4 p-3 bg-neutral-700 rounded animate-pulse"
        />
      ))}
    </div>
  )
}
