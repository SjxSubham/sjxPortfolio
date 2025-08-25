import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 dark:bg-dark py-8 text-center border-t border-slate-200/20 dark:border-white/5 transition-colors duration-300">
      <div className="container">
        <p className="text-slate-600 dark:text-gray-300 mb-2.5 text-base">
          &copy; {currentYear} Your Name. All Rights Reserved.
        </p>
        <p className="text-slate-600 dark:text-gray-300 text-base">
          Made with <FaHeart className="text-red-500 mx-1 inline-block animate-heartbeat" /> using React
        </p>
      </div>
    </footer>
  );
};

export default Footer;
