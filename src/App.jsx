import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { Coding } from './components/Coding';
import Slider from './components/Slider';
import Nei from './components/Nei';
// import PlasmaWaveV2 from './components/PlasmaWaveV2';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="relative">
          {/* <Navbar />
          <main className="pt-20">
        
            <Hero />
            <About />
            <Slider />
            <Skills />
            <Projects />
            <Coding />
            <Contact />
          </main>
          
          <Footer /> */}

          <Nei />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
