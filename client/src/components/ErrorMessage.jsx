function ErrorMessage({ message }) {
  return (
    <div role="alert" className="rounded-2xl border-2 border-red-500 bg-red-50 px-6 py-8 text-center shadow-[5px_5px_0_#fecaca]">
      <p className="font-display text-xl font-extrabold text-red-700">Something went wrong</p>
      <p className="mt-2 text-sm font-medium text-red-600">{message}</p>
    </div>
  )
}

export default ErrorMessage
