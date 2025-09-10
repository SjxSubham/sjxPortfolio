import { useState, useEffect, useRef } from 'react';
import '../styles/Robot.css';
import { useTheme } from '../context/ThemeContext';

const Robot = () => {
  // Track mouse position for enhanced interactions
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  const robotRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const [isWaving, setIsWaving] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [isExcited, setIsExcited] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [message, setMessage] = useState('');
  const [eyeDirection, setEyeDirection] = useState({ x: 0, y: 0 });
  const [robotMood, setRobotMood] = useState('happy'); // neutral, happy, curious, thinking
  
  // Enhanced messages for different nav items with personality
  const navMessages = {
    home: "Welcome to Subham's portfolio!",
    about: "Discover who Subham really is!",
    skills: "Impressive tech skills here!",
    projects: "Check out these amazing projects!",
    contact: "Let's connect! Say hello!",
    theme: "Changing the mood? I like it!"
  };
  
  // Initial greeting
  useEffect(() => {
    setTimeout(() => {
      setMessage("Hi there! I'm your friendly guide! Click me to say hi!");
      setIsTalking(true);
      setRobotMood('happy');
      
      setTimeout(() => {
        setIsTalking(false);
        setRobotMood('happy'); // Always stay happy
      }, 3500);
    }, 1000);
  }, []);
  
  // React to theme changes
  useEffect(() => {
    // Only show theme reaction after initial load
    if (robotRef.current) {
      setMessage(theme === 'dark' ? "Ooh, night mode looks cool!" : "Bright and shiny day mode!");
      setIsTalking(true);
      setIsExcited(true);
      
      setTimeout(() => {
        setIsExcited(false);
      }, 1000);
      
      setTimeout(() => {
        setIsTalking(false);
        setRobotMood('happy');
      }, 3000);
    }
  }, [theme]);
  
  // Handle robot click for jump animation
  const handleRobotClick = () => {
    if (!isJumping && !isWaving) {
      setIsJumping(true);
      setRobotMood('happy');
      
      // Start waving mid-jump
      setTimeout(() => {
        setIsWaving(true);
        setIsTalking(true);
        setMessage("Hello! Thanks for saying hi!");
      }, 300);
      
      // Stop jumping
      setTimeout(() => {
        setIsJumping(false);
      }, 1000);
      
      // Stop waving and talking but stay happy
      setTimeout(() => {
        setIsWaving(false);
        setIsTalking(false);
        setRobotMood('happy'); // Keep smiling
      }, 2500);
    }
  };
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Track mouse position for arm calculations
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Enhanced eye direction with smoother tracking
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setEyeDirection({ 
        x: x * 3, 
        y: Math.min(Math.max(y * 3, -3), 3) // Limit vertical eye movement
      });
      
      // Check if hovering over a nav item with improved detection
      const navItem = e.target.closest('a[data-nav-item]');
      if (navItem) {
        const section = navItem.getAttribute('data-nav-item');
        
        // If hovering a new nav item
        if (section !== hoveredNavItem) {
          setHoveredNavItem(section);
          
          // Show excitement on new nav item hover
          setIsExcited(true);
          setTimeout(() => setIsExcited(false), 800);
          
          // Show message with personality
          if (navMessages[section] && !isTalking) {
            setMessage(navMessages[section]);
            setIsTalking(true);
            setIsThinking(false);
            setRobotMood(section === 'projects' ? 'excited' : 
                        section === 'about' ? 'curious' : 
                        section === 'skills' ? 'proud' : 'happy');
            
            // Hide message after delay with varying times
            setTimeout(() => {
              setIsTalking(false);
              setRobotMood('happy'); // Stay happy after interaction
            }, 3000 + Math.random() * 500);
          }
        }
      } else {
        setHoveredNavItem(null);
      }
      
      // Occasionally peek in the direction of the cursor
      if (Math.random() < 0.01 && !isThinking && !isTalking) {
        setEyeDirection({ 
          x: x < 0.5 ? -1 : 1, 
          y: y < 0.5 ? -1 : 1 
        });
        
        setTimeout(() => {
          setEyeDirection({ x: 0, y: 0 });
        }, 800);
      }
    };
    
    // Enhanced occasional animations to make robot feel more alive and realistic
    const animationInterval = setInterval(() => {
      // Only animate when user isn't interacting with nav
      if (!isWaving && !isThinking && !isTalking) {
        // Always keep the default mood happy when idle
        setRobotMood('happy');
        
        const random = Math.random();
        
        if (random > 0.92) {
          // Wave occasionally with improved animation
          setIsWaving(true);
          setRobotMood('happy');
          setMessage(["Hello there!", "Hi!", "👋", "Welcome!"][Math.floor(Math.random() * 4)]);
          setIsTalking(true);
          
          setTimeout(() => {
            setIsWaving(false);
            setIsTalking(false);
            setRobotMood('happy'); // Keep smiling
          }, 2000);
        } else if (random > 0.85 && random <= 0.92) {
          // Show thinking bubble with more varied thoughts
          setIsThinking(true);
          setRobotMood('thinking');
          setMessage(["Hmm...", "Let me think...", "Interesting...", "I wonder..."][Math.floor(Math.random() * 4)]);
          
          setTimeout(() => {
            setIsThinking(false);
            setRobotMood('happy'); // Return to smiling
          }, 2500);
        } else if (random > 0.75 && random <= 0.85) {
          // New: Look around randomly to appear more lifelike
          const randomX = (Math.random() * 2 - 1) * 3;
          const randomY = (Math.random() * 2 - 1) * 2;
          setEyeDirection({ x: randomX, y: randomY });
          
          setTimeout(() => {
            setEyeDirection({ x: 0, y: 0 });
          }, 1000);
        }
      }
    }, 6000); // Slightly longer interval for more natural behavior

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(animationInterval);
    };
  }, [isWaving, isThinking, isTalking, hoveredNavItem, robotMood]);

  // Calculate robot arm angles based on mouse position
  const calculateRightArmAngle = () => {
    if (!robotRef.current) return 0;
    
    const robotRect = robotRef.current.getBoundingClientRect();
    const robotCenterX = robotRect.left + (robotRect.width / 2);
    const robotCenterY = robotRect.top + (robotRect.height / 2);
    
    // Calculate angle between robot and mouse
    const deltaX = mousePosition.x - robotCenterX;
    const deltaY = mousePosition.y - robotCenterY;
    
    // Convert angle from radians to degrees and limit the range
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    
    // Limit arm rotation to a realistic range (-45 to 45 degrees)
    angle = Math.max(-45, Math.min(45, angle));
    
    return angle;
  };

  // Calculate left arm angle - slightly different to make it look natural
  const calculateLeftArmAngle = () => {
    const rightArmAngle = calculateRightArmAngle();
    // Left arm moves in opposite direction but with a slight offset
    return -rightArmAngle * 0.8;
  };
  
  // Calculate head rotation (more subtle)
  const calculateHeadRotation = () => {
    const rightArmAngle = calculateRightArmAngle();
    // Head rotates less than the arms
    return rightArmAngle * 0.3;
  };

  return (
    <div 
      className={`robot ${isVisible ? 'visible' : ''} ${isWaving ? 'waving' : ''} ${isExcited ? 'excited' : ''} ${isJumping ? 'jumping' : ''} mood-${robotMood} theme-${theme}`}
      ref={robotRef}
      onClick={handleRobotClick}
      style={{
        position: 'fixed',
        right: '20px',
        top: '70px', // Position below navbar
        pointerEvents: 'auto', // Allow clicks
        cursor: 'pointer', // Show pointer cursor on hover
        zIndex: 999
      }}
    >
      {/* Enhanced speech or thinking bubble with animated typing effect */}
      {(isTalking || isThinking) && (
        <div className={`${isThinking ? 'thinking-bubble' : 'speech-bubble'} ${robotMood}`}>
          <span className="animated-text">{message}</span>
        </div>
      )}
      
      {/* Robot Head - more realistic with mood expressions */}
      <div className={`robot-head ${robotMood}`}>
        {/* Robot face plate with better reflections */}
        <div className="robot-face">
          {/* Eyes with better animations */}
          <div className="robot-eyes">
            <div 
              className={`robot-eye left ${isTalking ? 'animated' : ''}`}
              style={{ 
                transform: `translate(${eyeDirection.x}px, ${eyeDirection.y}px)`
              }}
            >
              <div className="robot-pupil"></div>
              <div className="robot-highlight"></div>
              <div className="robot-eye-lid"></div>
            </div>
            <div 
              className={`robot-eye right ${isTalking ? 'animated' : ''}`}
              style={{ 
                transform: `translate(${eyeDirection.x}px, ${eyeDirection.y}px)`
              }}
            >
              <div className="robot-pupil"></div>
              <div className="robot-highlight"></div>
              <div className="robot-eye-lid"></div>
            </div>
          </div>
          
          {/* Mouth with different expressions based on mood */}
          <div className={`robot-mouth ${isTalking ? 'talking' : ''} ${robotMood}`}></div>
        </div>
        
        {/* Antenna with better animation */}
        <div className="robot-antenna">
          <div className={`robot-antenna-tip ${isThinking ? 'active' : ''}`}></div>
        </div>
        
        {/* Ear panels with light indicators */}
        <div className={`robot-ear left ${hoveredNavItem ? 'active' : ''}`}></div>
        <div className={`robot-ear right ${hoveredNavItem ? 'active' : ''}`}></div>
      </div>
      
      {/* Robot Body - more detailed with additional features */}
      <div className={`robot-body ${robotMood}`}>
        {/* Collar/neck connection with better joint */}
        <div className="robot-collar">
          <div className="robot-collar-detail"></div>
        </div>
        
        {/* Body details with reactive lights */}
        <div className={`robot-chest-panel ${isExcited ? 'active' : ''}`}>
          <div className="robot-button"></div>
          <div className="robot-button"></div>
        </div>
        
        {/* Left Arm with improved joints and movement */}
        <div 
          className={`robot-arm robot-arm-left ${isWaving ? 'waving' : ''} ${robotMood}`}
          style={{ 
            transform: hoveredNavItem === 'about' || hoveredNavItem === 'home' ? 'rotate(15deg)' : '' 
          }}
        >
          <div className="robot-shoulder"></div>
          <div className="robot-upper-arm"></div>
          <div className="robot-elbow"></div>
          <div className="robot-lower-arm"></div>
          <div className="robot-wrist"></div>
          <div className="robot-hand">
            <div className="robot-finger thumb"></div>
            <div className="robot-finger index"></div>
            <div className="robot-finger middle"></div>
          </div>
        </div>
        
        {/* Right Arm with improved joints and movement */}
        <div 
          className={`robot-arm robot-arm-right ${isWaving ? 'waving' : ''} ${robotMood}`}
          style={{ 
            transform: hoveredNavItem === 'skills' || hoveredNavItem === 'projects' || hoveredNavItem === 'contact' ? 'rotate(-15deg)' : '' 
          }}
        >
          <div className="robot-shoulder"></div>
          <div className="robot-upper-arm"></div>
          <div className="robot-elbow"></div>
          <div className="robot-lower-arm"></div>
          <div className="robot-wrist"></div>
          <div className="robot-hand">
            <div className="robot-finger thumb"></div>
            <div className="robot-finger index"></div>
            <div className="robot-finger middle"></div>
          </div>
        </div>
      </div>
      
      {/* Shadow for 3D effect */}
      <div className="robot-shadow"></div>
    </div>
  );
};

export default Robot;
