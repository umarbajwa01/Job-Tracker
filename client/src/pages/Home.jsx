import Hero from '../components/Hero/Hero'
import CategoryPills from '../components/Categories/CategoryPills'
import FeaturedJobs from '../components/FeaturedJobs'

function Home() {
  return (
    <div>
      <Hero />
      <CategoryPills />
      <FeaturedJobs />
    </div>
  )
}

export default Home