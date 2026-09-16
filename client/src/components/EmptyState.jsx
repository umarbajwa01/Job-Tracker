function EmptyState({ title, message }) {
  return (
    <div className="pg-card px-6 py-14 text-center">
      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-yellow text-2xl shadow-[3px_3px_0_#1E293B]" aria-hidden="true">?</div>
      <h3 className="font-display text-xl font-extrabold">{title}</h3>
      <p className="mt-2 text-sm font-medium text-stone">{message}</p>
    </div>
  )
}

export default EmptyState
