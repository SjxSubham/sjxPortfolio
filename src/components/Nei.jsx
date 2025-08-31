import React from 'react';

const Nei = () => {
  return (
    <div
      style={{
        backgroundColor: 'black',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src="https://wzmpiaqjnegnitfnahue.supabase.co/storage/v1/object/public/resumes/Nei.png" // Replace with your image URL
        alt="Centered"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      />
    </div>
  );
};

export default Nei;