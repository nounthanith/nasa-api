import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiMap,
  FiCalendar,
  FiCamera,
  FiInfo,
  FiSun,
  FiClock,
  FiNavigation,
  FiExternalLink,
} from 'react-icons/fi';

const ImageModal = ({ selectedImage, closeModal, currentImageIndex, allPhotos, navigateImage }) => {
  if (!selectedImage) return null;

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeModal();
    else if (e.key === 'ArrowLeft') navigateImage('prev');
    else if (e.key === 'ArrowRight') navigateImage('next');
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImageIndex]);

  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="flex flex-col h-screen w-screen overflow-hidden bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-black/80 backdrop-blur-sm border-b border-gray-800">
              <div className="flex items-center space-x-4">
                <button
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeModal();
                  }}
                  aria-label="Close modal"
                >
                  <FiX size={24} />
                </button>
                <div className="text-white">
                  <h2 className="font-medium">{selectedImage.rover.name} Rover</h2>
                  <p className="text-sm text-gray-400">
                    Sol {selectedImage.sol} • {selectedImage.earth_date}
                  </p>
                </div>
              </div>
              <a
                href={selectedImage.img_src}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-amber-400 hover:text-amber-300 flex items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <FiExternalLink className="mr-1" /> Open Full Resolution
              </a>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Image viewer */}
              <div className="relative flex-1 flex items-center justify-center bg-black p-4 overflow-auto">
                <button
                  className="absolute left-4 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  aria-label="Previous image"
                >
                  <FiChevronLeft size={28} />
                </button>

                <motion.div
                  key={`${selectedImage.id}-${selectedImage.img_src}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full flex items-center justify-center p-4"
                >
                  <img
                    src={selectedImage.img_src}
                    alt={`Mars surface captured by ${selectedImage.rover.name}`}
                    className="max-w-full max-h-[calc(100vh-200px)] object-contain"
                    loading="lazy"
                  />
                </motion.div>

                <button
                  className="absolute right-4 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  aria-label="Next image"
                >
                  <FiChevronRight size={28} />
                </button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                  {currentImageIndex + 1} / {allPhotos.length}
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-full md:w-96 bg-gray-900/80 border-t md:border-t-0 md:border-l border-gray-800 overflow-y-auto">
                <div className="mt-6 p-6 bg-gray-900/50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Image Details */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <FiInfo className="mr-2 text-amber-400" />
                        Image Details
                      </h3>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Rover */}
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <div className="flex items-center text-amber-400 mb-1">
                            <FiMap className="mr-2" />
                            <span className="text-sm font-medium">Rover</span>
                          </div>
                          <p className="text-white">{selectedImage.rover.name}</p>
                          <p className="text-xs text-gray-400">Status: {selectedImage.rover.status}</p>
                        </div>

                        {/* Camera */}
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <div className="flex items-center text-amber-400 mb-1">
                            <FiCamera className="mr-2" />
                            <span className="text-sm font-medium">Camera</span>
                          </div>
                          <p className="text-white">{selectedImage.camera.full_name}</p>
                          <p className="text-xs text-gray-400">{selectedImage.camera.name}</p>
                        </div>

                        {/* Earth Date */}
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <div className="flex items-center text-amber-400 mb-1">
                            <FiCalendar className="mr-2" />
                            <span className="text-sm font-medium">Earth Date</span>
                          </div>
                          <p className="text-white">{selectedImage.earth_date}</p>
                        </div>

                        {/* Sol */}
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <div className="flex items-center text-amber-400 mb-1">
                            <FiSun className="mr-2" />
                            <span className="text-sm font-medium">Sol</span>
                          </div>
                          <p className="text-white">{selectedImage.sol}</p>
                        </div>
                      </div>

                      {/* Mission Progress */}
                      <div className="bg-gray-800/50 p-4 rounded-lg mt-2">
                        <div className="flex items-center text-amber-400 mb-2">
                          <FiClock className="mr-2" />
                          <span className="text-sm font-medium">Mission Progress</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div
                            className="bg-amber-500 h-2.5 rounded-full"
                            style={{
                              width: `${(selectedImage.sol / (selectedImage.rover.max_sol || 3000)) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Sol {selectedImage.sol} of {selectedImage.rover.max_sol || 'N/A'} (Martian days)
                        </p>
                      </div>
                    </div>

                    {/* Rover Info */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <FiNavigation className="mr-2 text-amber-400" />
                        Rover Information
                      </h3>

                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">{selectedImage.rover.name} Rover</h4>
                        <p className="text-sm text-gray-300 mb-3">
                          {selectedImage.rover.name} is a {selectedImage.rover.status.toLowerCase()} Mars rover
                          exploring the surface of Mars.
                        </p>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Launch Date:</span>
                            <span className="text-white">{selectedImage.rover.launch_date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Landing Date:</span>
                            <span className="text-white">{selectedImage.rover.landing_date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Status:</span>
                            <span
                              className={`font-medium ${
                                selectedImage.rover.status === 'active' ? 'text-green-400' : 'text-amber-400'
                              }`}
                            >
                              {selectedImage.rover.status.charAt(0).toUpperCase() + selectedImage.rover.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total Photos:</span>
                            <span className="text-white">
                              {selectedImage.rover.total_photos?.toLocaleString() || 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                        <h4 className="font-medium text-amber-400 mb-2">Did You Know?</h4>
                        <p className="text-sm text-amber-100">
                          The {selectedImage.rover.name} rover has been exploring Mars for {selectedImage.sol} Martian
                          days (sols). A day on Mars is about 40 minutes longer than a day on Earth!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between items-center">
                    <p className="text-sm text-gray-400">
                      Photo {currentImageIndex + 1} of {allPhotos.length}
                    </p>
                    <a
                      href={selectedImage.img_src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
                    >
                      View Full Resolution
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
