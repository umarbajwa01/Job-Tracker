function EmptyState({ title, message }) {
  return (
    <div className="text-center py-16">
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500">{message}</p>
    </div>
  )
}

export default EmptyState