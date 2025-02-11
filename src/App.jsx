import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon } from '@heroicons/react/solid';

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dateChoice, setDateChoice] = useState('');
  const [restaurantChoice, setRestaurantChoice] = useState('');
  const [customPlace, setCustomPlace] = useState('');
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('valentinesState');
    if (savedState) {
      const { step, date, restaurant, custom } = JSON.parse(savedState);
      setCurrentStep(step);
      setDateChoice(date);
      setRestaurantChoice(restaurant);
      setCustomPlace(custom);
    }
    setShowContent(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('valentinesState', JSON.stringify({
      step: currentStep,
      date: dateChoice,
      restaurant: restaurantChoice,
      custom: customPlace
    }));
  }, [currentStep, dateChoice, restaurantChoice, customPlace]);

  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  const handleHeartClick = () => {
    setCurrentStep(1);
  };

  const handleValentineAnswer = () => {
    playSound('kiss.mp3');
    setCurrentStep(2);
  };

  const handleDateChoice = (choice) => {
    setDateChoice(choice);
    if (choice === 'Hotel n u turns') {
      setRestaurantChoice('No restaurant selected');
      playSound('yay.mp3');
      setCurrentStep(4);
    } else {
      setCurrentStep(3);
    }
  };

  const handleRestaurantChoice = (place) => {
    if (place === 'Custom') {
      const customInput = prompt('Enter the name of your preferred place:');
      if (customInput) {
        setRestaurantChoice('Custom');
        setCustomPlace(customInput);
      }
    } else {
      setRestaurantChoice(place);
    }
    playSound('yay.mp3');
    setCurrentStep(4);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setDateChoice('');
    setRestaurantChoice('');
    setCustomPlace('');
    localStorage.removeItem('valentinesState');
  };

  const breakfastOptions = [
    'German Bakery', 'Beans n Bakery', 'French Window', 
    'Le Flemington', 'Zen Cafe'
  ];

  const dinnerOptions = [
    'Mister Merchants', 'Tsuki', 'Cafe Paash', 'Kukoo'
  ];

  const getRestaurantOptions = () => {
    if (dateChoice === 'Breakfast n Hotel') {
      return [...breakfastOptions, 'Custom'];
    } else if (dateChoice === 'Hotel n Dinner') {
      return [...dinnerOptions, 'Custom'];
    } else if (dateChoice === 'Food n u turns') {
      return [...breakfastOptions, ...dinnerOptions, 'Custom'];
    }
    return [];
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-valentine-background to-pink-50 p-4">
      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div
            key={currentStep}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {currentStep === 0 && (
              <div className="flex flex-col items-center pt-20">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="cursor-pointer relative"
                  onClick={handleHeartClick}
                >
                  <div className="absolute left-1/2 -top-20 w-px h-20 bg-gray-300" />
                  <HeartIcon className="w-32 h-32 text-valentine-primary animate-pulse-slow" />
                </motion.div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="flex flex-col items-center pt-10 space-y-8">
                <motion.img
                  src="emo1.png"
                  alt="Emoji"
                  className="w-64 h-64 rounded-full shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
                <motion.h2
                  className="text-5xl font-bold text-pink-600 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Will you be my valentine?
                </motion.h2>
                <motion.button
                  onClick={handleValentineAnswer}
                  className="px-12 py-4 text-2xl bg-gradient-to-r from-valentine-primary to-valentine-secondary text-white rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Yes!
                </motion.button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="flex flex-col items-center pt-10 space-y-8">
                <motion.img
                  src="emo2.png"
                  alt="Emoji"
                  className="w-64 h-64 rounded-full shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
                <h2 className="text-4xl font-bold text-pink-600 text-center">Pick a date</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                  {['Breakfast n Hotel', 'Hotel n u turns', 'Hotel n Dinner', 'Food n u turns'].map((choice, index) => (
                    <motion.button
                      key={choice}
                      onClick={() => handleDateChoice(choice)}
                      className="px-8 py-4 bg-white text-pink-600 rounded-2xl hover:bg-pink-50 transition-all duration-200 shadow-md hover:shadow-lg border-2 border-pink-200"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {choice}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex flex-col items-center pt-10 space-y-8">
                <h2 className="text-4xl font-bold text-pink-600 text-center">Pick a place</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                  {getRestaurantOptions().map((place, index) => (
                    <motion.div
                      key={place}
                      className="flex flex-col items-center space-y-3"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {place !== 'Custom' && (
                        <div className="relative group">
                          <img
                            src={`${place.toLowerCase().replace(/\s+/g, '')}.jpg`}
                            alt={place}
                            className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-all duration-200"
                          />
                          <div className="absolute inset-0 bg-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-200 rounded-lg" />
                        </div>
                      )}
                      <button
                        onClick={() => handleRestaurantChoice(place)}
                        className="px-6 py-3 bg-white text-pink-600 rounded-full hover:bg-pink-50 transition-all duration-200 shadow-md hover:shadow-lg border-2 border-pink-200 w-full"
                      >
                        {place}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="flex flex-col items-center pt-10 space-y-8">
                <motion.img
                  src="emo3.png"
                  alt="Emoji"
                  className="w-64 h-64 rounded-full shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
                <motion.div
                  className="text-center space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-5xl font-bold text-pink-600">It's a date!!!</h2>
                  <div className="space-y-4 text-2xl text-pink-600">
                    <p>Date Type: {dateChoice}</p>
                    <p>Place: {restaurantChoice === 'Custom' ? customPlace : restaurantChoice}</p>
                  </div>
                  {restaurantChoice !== 'Custom' && restaurantChoice !== 'No restaurant selected' && (
                    <motion.img
                      src={`${restaurantChoice.toLowerCase().replace(/\s+/g, '')}.jpg`}
                      alt={restaurantChoice}
                      className="w-full max-w-md h-64 object-cover rounded-lg shadow-xl mx-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    />
                  )}
                </motion.div>
                <motion.button
                  onClick={handleReset}
                  className="px-8 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-all duration-200 shadow-md hover:shadow-lg mt-8"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
