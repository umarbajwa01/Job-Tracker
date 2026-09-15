function ErrorMessage({ message }) {
  return (
    <div className="text-center py-16">
      <p className="text-red-600 font-medium">Something went wrong</p>
      <p className="text-gray-500 text-sm mt-1">{message}</p>
    </div>
  )
}

export default ErrorMessage