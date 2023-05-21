export default function DashboardEditingLoading() {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex items-end justify-end gap-2">
        {[...Array(2)].map((i) => (
          <div
            key={i}
            className=" p-2 bg-neutral-700 py-5 px-12 rounded animate-pulse"
          />
        ))}
      </div>

      <div className="w-full p-6 bg-neutral-700 rounded animate-pulse" />
      {[...Array(10)].map((i) => (
        <div
          key={i}
          className="w-full mt-4 p-3 bg-neutral-700 rounded animate-pulse"
        />
      ))}
    </div>
  )
}
