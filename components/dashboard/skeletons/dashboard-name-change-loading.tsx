const DashboardNameChangeLoading = () => {
  return (
    <div className="w-full flex flex-col gap-2 py-6 px-4 border border-neutral-600 rounded">
      <div className="w-full max-w-[8rem] p-3 bg-neutral-700 rounded animate-pulse" />
      <div className="w-full max-w-[16rem] mt-4 p-3 bg-neutral-700 rounded animate-pulse" />
      <div className="w-full max-w-[20rem] mt-2 p-6 bg-neutral-700 rounded animate-pulse" />
      <div className="w-full max-w-[6rem] mt-2 p-4 bg-neutral-700 rounded animate-pulse" />
    </div>
  )
}

export default DashboardNameChangeLoading
