import SearchBar from './SearchBar'

function Hero() {
  return (
    <>
      <section className="relative overflow-hidden border-b-2 border-ink bg-cream py-14 md:py-20">
        <div className="shape shape-circle -left-16 top-16 hidden md:block" />
        <div className="shape shape-square right-12 top-12 hidden md:block" />
        <div className="shape shape-pill bottom-14 right-[-48px] hidden lg:block" />

        <div className="pg-shell relative z-10 grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <span className="pg-eyebrow mb-6"><span className="h-2.5 w-2.5 rounded-full bg-mint" /> Fresh jobs, less chaos</span>
            <h1 className="pg-display max-w-3xl text-5xl sm:text-6xl lg:text-7xl">
              Find work that <span className="relative inline-block text-violet">fits<span className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-yellow" /></span> your life.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-stone md:text-lg">
              Search real opportunities, save your favorites, and keep your next career move organized in one cheerful place.
            </p>
            <div className="mt-8">
              <SearchBar />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[460px] py-10">
            <div className="absolute inset-8 translate-x-5 translate-y-5 rounded-[32px_32px_32px_0] border-2 border-ink bg-yellow" />
            <div className="pg-dot-pattern absolute -right-5 -top-1 h-36 w-36 rounded-3xl opacity-45" />
            <div className="relative rounded-[32px_32px_32px_0] border-2 border-ink bg-white p-7 shadow-[8px_8px_0_#F472B6]">
              <div className="mb-7 flex items-center justify-between">
                <span className="pg-eyebrow bg-mint">Job match</span>
                <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-ink bg-violet text-xl text-white">★</span>
              </div>
              <p className="font-display text-2xl font-extrabold">Frontend Developer</p>
              <p className="mt-1 font-semibold text-stone">Creative Studio · Remote</p>
              <div className="my-6 grid grid-cols-3 gap-3">
                {['React', 'Remote', '£65k+'].map((item, index) => (
                  <span key={item} className={`rounded-full border-2 border-ink px-3 py-2 text-center text-xs font-extrabold ${index === 0 ? 'bg-pink/40' : index === 1 ? 'bg-yellow/60' : 'bg-mint/40'}`}>
                    {item}
                  </span>
                ))}
              </div>
              <div className="rounded-2xl border-2 border-dashed border-ink bg-muted p-4 text-sm font-semibold text-stone">
                92% match based on your search.
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="pg-marquee" aria-hidden="true">
        <div className="pg-marquee-track">
          <span>Design ✦ Engineering ✦ Marketing ✦ Remote ✦ Finance ✦ Product ✦ Sales ✦</span>
          <span>Design ✦ Engineering ✦ Marketing ✦ Remote ✦ Finance ✦ Product ✦ Sales ✦</span>
        </div>
      </div>

      <section className="border-b-2 border-ink bg-white py-7">
        <div className="pg-shell grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
          {[['10,000+', 'Live job listings', 'bg-violet text-white'], ['5,000+', 'Hiring companies', 'bg-pink'], ['UK-wide', 'Updated daily', 'bg-mint']].map(([value, label, color]) => (
            <div key={label} className="flex items-center justify-center gap-3">
              <span className={`rounded-full border-2 border-ink px-3 py-1 font-display text-lg font-extrabold ${color}`}>{value}</span>
              <span className="text-sm font-bold text-stone">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Hero
