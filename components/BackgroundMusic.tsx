'use client';

import { useEffect, useRef } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/background_music/I know that what i\'ve found is once in a lifetime....mp3');
    audio.loop = true;
    audio.volume = 0.5; // Set initial volume to 50%
    audioRef.current = audio;

    // Function to handle user interaction
    const handleUserInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.log('Autoplay prevented:', error);
        });
        // Remove event listeners after first interaction
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      }
    };

    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default BackgroundMusic; 