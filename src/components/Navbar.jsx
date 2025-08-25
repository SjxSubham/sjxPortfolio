import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-20 flex justify-center items-center backdrop-blur-md px-4 bg-white/90 dark:bg-black/80 backdrop-blur-md z-10 transition-all duration-300 shadow-sm">
      <div className="flex justify-between items-center w-full max-w-7xl px-4">
        <Link to="/" className="text-2xl font-bold flex items-center" onClick={closeMenu}>
          <span className="bg-gradient-primary bg-clip-text text-transparent">PORTFOLIO</span>
        </Link>
        <div className="hidden md:flex">
          <ul className="flex items-center">
            {["home", "about", "skills", "projects", "contact"].map((item) => (
              <li key={item} className="h-20 px-4 flex items-center">
                <a 
                  href={`#${item}`} 
                  className="text-slate-800 dark:text-white px-4 py-2 h-full flex items-center font-medium relative hover:text-primary transition-colors duration-300 after:content-[''] after:absolute after:bottom-[25px] after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-gradient-primary after:transition-all after:duration-300 hover:after:w-[70%]"
                  onClick={closeMenu}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
            <li className="ml-4 h-20 flex items-center">
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full bg-slate-200/70 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-300" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-700" />
                )}
              </button>
            </li>
          </ul>
        </div>
        <div className="md:hidden text-slate-800 dark:text-white text-2xl cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <div className={`${isOpen ? "left-0 opacity-100" : "-left-full opacity-100"} md:hidden fixed top-20 flex flex-col w-full bg-white/95 dark:bg-black/95 transition-all duration-500 p-8 z-10`}>
          <ul className="flex flex-col w-full">
            {["home", "about", "skills", "projects", "contact"].map((item) => (
              <li key={item} className="h-15 w-full flex justify-center">
                <a 
                  href={`#${item}`} 
                  className="text-slate-800 dark:text-white text-center py-4 px-4 w-full flex justify-center items-center relative after:content-[''] after:absolute after:bottom-[15px] after:w-0 after:h-0.5 after:bg-gradient-primary after:transition-all after:duration-300 hover:after:w-[70%] hover:text-primary"
                  onClick={closeMenu}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
            <li className="mt-4 w-full flex justify-center">
              <button 
                onClick={toggleTheme} 
                className="p-3 rounded-full bg-slate-200/70 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-5 h-5 text-yellow-300" />
                    <span className="text-slate-800 dark:text-white">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5 text-slate-700" />
                    <span className="text-slate-800">Dark Mode</span>
                  </>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
