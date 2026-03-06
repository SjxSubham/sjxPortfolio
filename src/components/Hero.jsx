import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import PlasmaWaveV2 from './PlasmaWaveV2';
import SplitText from './SplitText';
const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-5 bg-gradient-to-br from-light to-light/90 dark:from-dark dark:to-dark/10 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-radial-gradient transition-colors duration-3000"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className='flex justify-between items-center animate-fadeIn'>
        <div className="absolute -right-96 top-12 z-0 flex" style={{ width: '100%', height: '600px', position: 'relative' }}>
          <PlasmaWaveV2
            // 
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
          />

        </div>
      </div>
      <div className='flex justify-center items-center animate-fadeIn'>
        <div className="absolute -inset-52 z-10 flex" style={{ width: '100%', height: '600px', position: 'relative' }}>
          <PlasmaWaveV2
            // 
            hoverIntensity={0.1}
            rotateOnHover={false}
            hue={0}
            forceHoverState={true}
          />

        </div>
      </div>
      <div className="text-center justify-between flex-shrink-0 max-w-4xl w-full z-10 p-8 animate-fadeIn">
        <h1 className="justify-between text-5xl md:text-6xl mb-4 font-bold text-slate-800 dark:text-white z-10">
          <SplitText
            text=" Hello, I'm "
            className="text-5xl font-semibold text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          // onLetterAnimationComplete={handleAnimationComplete}
          />
          <span className="bg-gradient-primary bg-clip-text text-transparent">  Subham Mondal</span>
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
            href="https://www.linkedin.com/in/subham-mondal-914b0b2b8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-200/50 dark:bg-white/10 mx-2.5 text-2xl text-slate-700 dark:text-white transition-all duration-300 hover:bg-gradient-primary hover:text-white hover:transform hover:-translate-y-1 hover:shadow-lg"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://x.com/SjxSubham4249"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-200/50 dark:bg-white/10 mx-2.5 text-2xl text-slate-700 dark:text-white transition-all duration-300 hover:bg-gradient-primary hover:text-white hover:transform hover:-translate-y-1 hover:shadow-lg"
          >
            <FaTwitter />
          </a>
        </div>

      </div>
      <div className='flex justify-center items-center animate-fadeIn'>
        <div className="absolute right-16 -top-48 z-0 flex" style={{ width: '100%', height: '600px', position: 'relative' }}>
          <PlasmaWaveV2
            // 
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
          />

        </div>

      </div>
      <div className='flex justify-center items-center animate-fadeIn'>
        <div className="absolute right-40  top-40 z-20 flex" style={{ width: '100%', height: '600px', position: 'relative' }}>
          <PlasmaWaveV2
            // 
            hoverIntensity={0.2}
            rotateOnHover={false}
            hue={0}
            forceHoverState={true}
          />

        </div>
      </div>
    </section>
  );
};

export default Hero;
