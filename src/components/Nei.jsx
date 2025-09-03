import React, { useState } from 'react';

const Nei = () => {
  // const [isPlaying, setIsPlaying] = useState(false); // State to control audio playback
  // const audioRef = React.useRef(null); // Reference to the audio element

  // const handleImageClick = () => {
  //   if (audioRef.current) {
  //     if (!isPlaying) {
  //       audioRef.current.play(); // Play the audio
  //     } else {
  //       audioRef.current.pause(); // Pause the audio
  //     }
  //     setIsPlaying(!isPlaying); // Toggle the playback state
  //   }
  // };
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
       {/* <audio ref={audioRef} loop>
        <source
          src="https://wzmpiaqjnegnitfnahue.supabase.co/storage/v1/object/public/resumes/Punorjonmo.mp3" // Replace with your audio URL
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio> */}
      <img
        src="https://wzmpiaqjnegnitfnahue.supabase.co/storage/v1/object/public/resumes/Nei%20(2).png" // Replace with your image URL
        alt="Centered"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          cursor: 'pointer', 
        }}
        // onClick={handleImageClick} // Handle click event
      />
    </div>
  );
};

export default Nei;