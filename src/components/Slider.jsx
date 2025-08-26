import React from 'react';

const Slider = () => {
  return (
    <div className="relative  container h-auto max-w-4xl">
      <h2 className="text-3xl text-center font-mono mb-14"></h2>
      <div className="iframe-container border-spacing-6 border-gray-300 rounded-md shadow-lg overflow-auto">
        {/* <iframe
          src="https://mygithubapp.onrender.com/" // Replace with the URL of the site you want to showcase
          title="Showcased Site"
          className="w-full h-[600px]"
          frameBorder="20"
          cornerRadius="10px"
        //   frame-ancestors="none"
          allowFullScreen
        ></iframe>
        
        */
        <img src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=sjxsubham&theme=tokyonight"
          alt="Github stats"
          className='rounded-lg shadow-lg px-16'
        
        
        />
        }
      </div>
    </div>
  );
};

export default Slider;