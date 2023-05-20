const DashboardLoading = () => {
  return (
    <div className="flex flex-col w-full items-start justify-start gap-8">
      {[...Array(20)].map((i) => (
        <div
          key={i}
          className="w-full flex items-center justify-between py-4 px-4 border border-neutral-600 rounded animate-pulse"
        >
          <div className="w-full flex flex-col items-start justify-start gap-2 rounded">
            <div className='w-full max-w-[10rem] p-3 bg-neutral-700 rounded border"' />
            <div className='w-full max-w-[4rem] p-2 bg-neutral-700 rounded border"' />
          </div>
          <div className="w-full max-w-[1rem] p-3 bg-neutral-700 rounded" />
        </div>
      ))}
    </div>
  )
}

export default DashboardLoading
