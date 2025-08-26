import { FaHeart } from 'react-icons/fa';
import { SiLeetcode } from "react-icons/si";
import { BiLogoGithub } from "react-icons/bi";
import { SiDevdotto } from "react-icons/si";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 dark:bg-dark py-6  border-t border-slate-200/20 dark:border-white/5 transition-colors duration-300">
     
        <div className='flex'>
        <a className='px-10 h-8  text-3xl inline-flex gap-2' href='https://leetcode.com/u/Sjx_Subham/'>
        <SiLeetcode className='rounded-3xl'/><span className='hover:shadow-gray-800 rounded-lg shadow-lg px-4 text-lg  font-extralight dark:text-gray-400'>Leetcode</span>
        </a>
      <div className="container text-center justify-between">
        <p className="text-slate-600 dark:text-gray-300 mb-2.5 text-base">
          &copy; {currentYear} sjx. All Rights Reserved.
        </p>
        <p className="text-slate-600 dark:text-gray-300 text-base">
          Made with <FaHeart className="text-red-500 mx-1 inline-block animate-heartbeat" /> 
        </p>
       
      </div>
    
        <a className='px-10 h-8 text-3xl inline-flex gap-2 justify-end' href='https://github.com/SjxSubham/'>
        <BiLogoGithub  className='rounded-3xl'/><span className='hover:shadow-gray-800 rounded-lg shadow-lg px-4 text-lg  font-extralight dark:text-gray-400'>Github</span>
        </a>
        </div>
        
    </footer>
    
  );
};

export default Footer;
