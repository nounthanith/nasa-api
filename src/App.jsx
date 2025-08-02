import React, { useState, useEffect, useCallback } from 'react';
import getMarsPhotos from './utils/api';
import { motion } from 'framer-motion';
import { FiMap } from 'react-icons/fi';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Gallery from './components/Gallery';
import AboutSection from './components/AboutSection';
import ImageModal from './components/ImageModal';
import CustomCursor from './components/CustomCursor';

function App() {
  // State management
  const [allPhotos, setAllPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [photosPerPage] = useState(12);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [loadingProgress, setLoadingProgress] = useState({
    currentYear: 2012,
    totalYears: 12, // 2012 to 2023
    message: 'Starting to fetch photos...'
  });

  // Update loading progress
  const updateProgress = useCallback((year, message) => {
    setLoadingProgress(prev => ({
      ...prev,
      currentYear: year,
      message: message || `Fetching photos from ${year}...`
    }));
  }, []);

  // Fetch all photos on component mount
  useEffect(() => {
    const fetchAllPhotos = async () => {
      setLoading(true);
      updateProgress(2012, 'Starting to fetch photos...');
      
      try {
        // Fetch photos from random dates across all years
        // Second parameter (1) means fetch 1 page per date (up to 25 photos per year)
        const data = await getMarsPhotos("curiosity", 1);
        setAllPhotos(data);
        setError(null);
        updateProgress(2023, 'Done!');
      } catch (err) {
        console.error("Error fetching photos:", err);
        setError(err);
        setAllPhotos([]);
        updateProgress(2023, 'Error fetching photos');
      } finally {
        setLoading(false);
      }
    };

    fetchAllPhotos();
  }, [updateProgress]);



  // Handle image click to open modal
  const openImageModal = useCallback((photo, index) => {
    const globalIndex = (page - 1) * photosPerPage + index;
    setCurrentImageIndex(globalIndex);
    setSelectedImage(photo);
    document.body.style.overflow = 'hidden';
  }, [page, photosPerPage]);

  // Close modal
  const closeImageModal = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  }, []);

  // Navigate between images in modal
  const navigateImage = useCallback((direction) => {
    let newIndex;
    if (direction === 'prev') {
      newIndex = (currentImageIndex - 1 + allPhotos.length) % allPhotos.length;
    } else {
      newIndex = (currentImageIndex + 1) % allPhotos.length;
    }
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(allPhotos[newIndex]);
    
    // Update page if needed
    const newPage = Math.floor(newIndex / photosPerPage) + 1;
    if (newPage !== page) {
      setPage(newPage);
    }
  }, [allPhotos, currentImageIndex, page, photosPerPage]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') {
        closeImageModal();
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImageIndex, closeImageModal, navigateImage]);

  return (
    <div className="min-h-screen bg-gray-900 text-white cursor-none">
      <CustomCursor />
      {/* Navigation */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="pt-16 min-h-screen">
        {/* Hero Section */}
        <HeroSection setActiveSection={setActiveSection} />
        
        {/* Gallery Section */}
        <Gallery 
          photos={allPhotos}
          page={page}
          setPage={setPage}
          photosPerPage={photosPerPage}
          loading={loading}
          error={error}
          openImageModal={openImageModal}
          loadingProgress={loadingProgress}
        />

        {/* About Section */}
        <AboutSection />
      </main>

      {/* Image Modal */}
      <ImageModal 
        selectedImage={selectedImage}
        closeModal={closeImageModal}
        currentImageIndex={currentImageIndex}
        allPhotos={allPhotos}
        navigateImage={navigateImage}
      />
      
      {/* Footer */}
      <footer className="bg-gray-900/80 border-t border-gray-800/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <FiMap className="h-6 w-6 text-amber-500" />
              <span className="ml-2 text-lg font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Mars Explorer
              </span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-center text-sm text-gray-400">
                Made by <span className="text-amber-500">Nuon Thanith❤️</span> using NASA's Mars Rover Photos API
              </p>
              <p className="text-center text-xs text-gray-500 mt-1">
                Data provided by NASA/JPL-Caltech
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <a
                href="https://api.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-amber-500 hover:text-amber-400 transition-colors duration-200"
              >
                API Documentation
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
