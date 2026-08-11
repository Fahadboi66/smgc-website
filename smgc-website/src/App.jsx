import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Services from './components/Services'
import HowWeWork from './components/HowWeWork'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import { useScrollSpy } from './hooks/useScrollSpy'

// Each component owns its own section id anchor for scroll-spy
const SECTION_IDS = ['home', 'about', 'services', 'how-we-work', 'contact']

export default function App() {
  const activeSection = useScrollSpy(SECTION_IDS)

  return (
    <>
      {/* Skip-to-content for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]
                   focus:px-4 focus:py-2 focus:bg-cyan-400 focus:text-navy-950 focus:font-semibold
                   focus:rounded focus:text-sm"
      >
        Skip to main content
      </a>

      <Navbar activeSection={activeSection} />

      <main id="main-content">
        {/* Each component has its own id="home|about|services|how-we-work|contact" */}
        <Hero />
        <Marquee />
        <About />
        <Services />
        <HowWeWork />
        <Contact />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
