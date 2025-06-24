import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FloatingEmojisBackground from './components/FloatingEmojisBackground';
import ParticlesBackground from './components/VantaBackground';
import Hero from './components/Hero';
import WhatIsSoulScrolls from './components/WhatIsSoulScrolls';
import HowItWorks from './components/HowItWorks';
import UseCases from './components/UseCases';
import Features from './components/Features';
import ScrollWall from './components/ScrollWall';
import BehindTheMagic from './components/BehindTheMagic';
import WhySoulScrolls from './components/WhySoulScrolls';
import BuiltFor from './components/BuiltFor';
import Footer from './components/Footer';
import Write from './pages/Write';
import Explore from './pages/Explore';
import Send from './pages/Send';
import MyScrolls from './pages/MyScrolls';

function App() {
  return (
    <Router>
      <Navbar />
      <ParticlesBackground />
      <FloatingEmojisBackground />
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <WhatIsSoulScrolls />
              <HowItWorks />
              <UseCases />
              <Features />
              <ScrollWall />
              <BehindTheMagic />
              <WhySoulScrolls />
              <BuiltFor />
            </>
          } />
          <Route path="/write" element={<Write />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/send" element={<Send />} />
          <Route path="/my-scrolls" element={<MyScrolls />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  )
}

export default App
