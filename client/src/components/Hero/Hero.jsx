import SearchBar from './SearchBar'

function Hero() {
  return (
    <section className="bg-gradient-to-b from-sand to-cream px-6 md:px-8 py-12 md:py-20 text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-ink mb-4">
        Find the job that's right for you
      </h1>
      <p className="text-base md:text-lg text-stone mb-8">
        Search thousands of real job listings, all in one place.
      </p>

      <SearchBar />

      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-12">
        <div>
          <p className="text-2xl md:text-3xl font-bold text-forest">10,000+</p>
          <p className="text-sm text-stone">Live job listings</p>
        </div>
        <div>
          <p className="text-2xl md:text-3xl font-bold text-forest">5,000+</p>
          <p className="text-sm text-stone">Hiring companies</p>
        </div>
        <div>
          <p className="text-2xl md:text-3xl font-bold text-forest">UK-wide</p>
          <p className="text-sm text-stone">Coverage, updated daily</p>
        </div>
      </div>
    </section>
  )
}

export default Hero