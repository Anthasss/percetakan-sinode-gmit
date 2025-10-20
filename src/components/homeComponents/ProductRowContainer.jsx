export default function ProductRowContainer( {children} ) {
  return (
    <div className="w-full h-auto flex flex-col gap-4">
      {children}
      <div className="divider divider-neutral"></div>
    </div>
  )
}