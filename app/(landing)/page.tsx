import { LandingContent } from "@/components/LandingContent"
import { LandingHero } from "@/components/LandingHero"
import { LandingNavbar } from "@/components/LandingNavbar"

 
const LadingPage = () => {
  return (
    <div className="h-full">
      <LandingNavbar/>
      <LandingHero/>
      <LandingContent/>
    </div>
  )
}

export default LadingPage