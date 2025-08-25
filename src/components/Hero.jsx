import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import PlasmaWaveV2 from './PlasmaWaveV2';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center px-5 bg-gradient-to-br from-light to-light/90 dark:from-dark dark:to-dark/90 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-radial-gradient transition-colors duration-300"
    >
      <div className="text-center max-w-3xl w-full z-10 p-8 animate-fadeIn">
        <h1 className="text-5xl md:text-6xl mb-4 font-bold text-slate-800 dark:text-white">
          Hello, I'm <span className="bg-gradient-primary bg-clip-text text-transparent">Your Name</span>
        </h1>
        <h2 className="text-2xl md:text-3xl mb-8 text-primary font-semibold">Full Stack Developer</h2>
        <p className="text-lg md:text-xl mb-8 text-slate-600 dark:text-gray-300">I build amazing web applications with modern technologies</p>
        <div className="mb-8">
          <a href="#projects" className="btn btn-primary">View My Work</a>
          <a href="#contact" className="btn btn-secondary">Contact Me</a>
        </div>
        <div className="flex justify-center mt-8">
          <a 
            href="https://github.com/SjxSubham" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-200/50 dark:bg-white/10 mx-2.5 text-2xl text-slate-700 dark:text-white transition-all duration-300 hover:bg-gradient-primary hover:text-white hover:transform hover:-translate-y-1 hover:shadow-lg"
          >
            <FaGithub />
          </a>
          <a 
            href="https://linkedin.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-200/50 dark:bg-white/10 mx-2.5 text-2xl text-slate-700 dark:text-white transition-all duration-300 hover:bg-gradient-primary hover:text-white hover:transform hover:-translate-y-1 hover:shadow-lg"
          >
            <FaLinkedin />
          </a>
          <a 
            href="https://twitter.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-200/50 dark:bg-white/10 mx-2.5 text-2xl text-slate-700 dark:text-white transition-all duration-300 hover:bg-gradient-primary hover:text-white hover:transform hover:-translate-y-1 hover:shadow-lg"
          >
            <FaTwitter />
          </a>
        </div>
        <PlasmaWaveV2 yOffset={0} xOffset={40} rotationDeg={-45} />
      </div>
    </section>
  );
};

export default Hero;
