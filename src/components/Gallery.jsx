import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FiMap, FiCalendar, FiCamera } from 'react-icons/fi';

export const PhotoCard = ({ photo, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3, delay: index % 6 * 0.05 }}
    className="group relative overflow-hidden rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-800/50 hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5"
  >
    <div 
      className="relative aspect-square overflow-hidden cursor-zoom-in"
      onClick={() => onClick(photo, index)}
    >
      <img
        src={photo.img_src}
        alt={`Mars surface captured by ${photo.rover.name}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div className="space-y-1">
          <span className="inline-flex items-center text-sm text-amber-400">
            <FiMap className="mr-1.5" /> {photo.rover.name}
          </span>
          <h3 className="font-medium text-white line-clamp-2">
            {photo.camera.full_name}
          </h3>
        </div>
      </div>
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center text-xs text-gray-400">
          <FiCalendar className="mr-1.5" /> {photo.earth_date}
        </span>
        <span className="inline-flex items-center text-xs text-gray-400">
          <FiCamera className="mr-1.5" /> {photo.camera.name}
        </span>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </motion.div>
);

const Pagination = ({ page, totalPages, setPage, loading }) => {
  if (totalPages <= 1) return null;

  return (
    <motion.div 
      className="flex flex-col items-center mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center space-x-2 mb-4">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1 || loading}
          className="px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          First
        </button>
        <button
          onClick={() => setPage(prev => Math.max(1, prev - 1))}
          disabled={page === 1 || loading}
          className="p-2 rounded-md text-amber-400 hover:bg-gray-800/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <FiChevronLeft className="h-5 w-5" />
        </button>
        
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (page <= 3) {
            pageNum = i + 1;
          } else if (page >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = page - 2 + i;
          }
          
          return pageNum <= totalPages ? (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              disabled={loading}
              className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                page === pageNum
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-300 hover:bg-gray-800/50'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {pageNum}
            </button>
          ) : null;
        })}
        
        <button
          onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
          disabled={page === totalPages || loading}
          className="p-2 rounded-md text-amber-400 hover:bg-gray-800/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <FiChevronRight className="h-5 w-5" />
        </button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages || loading}
          className="px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Last
        </button>
      </div>
      
      <p className="text-sm text-gray-400">
        Page {page} of {totalPages}
      </p>
    </motion.div>
  );
};

const Gallery = ({ photos, page, setPage, photosPerPage, loading, error, openImageModal }) => {
  const [displayedPhotos, setDisplayedPhotos] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  // Update displayed photos and pagination when photos, page, or photosPerPage changes
  useEffect(() => {
    if (photos.length > 0) {
      const total = Math.ceil(photos.length / photosPerPage);
      setTotalPages(total || 1);
      
      const startIndex = (page - 1) * photosPerPage;
      const endIndex = startIndex + photosPerPage;
      
      setDisplayedPhotos(photos.slice(startIndex, endIndex));
    }
  }, [photos, page, photosPerPage]);

  return (
    <section id="gallery" className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Mars Rover Photos</span>
            <span className="block text-amber-500 text-xl mt-2">Curiosity Rover</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-gray-300 sm:mt-4 sm:text-lg md:mt-5">
            Browse through images captured by NASA's Curiosity rover on the surface of Mars.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-900/30 border border-red-800 text-red-100 px-6 py-4 rounded-lg mb-8 flex items-center"
            >
              <div className="flex-1">
                <h3 className="font-medium">Error loading images</h3>
                <p className="text-sm text-red-300">{error.message}</p>
              </div>
            </motion.div>
          )}

          {loading ? (
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-white">Loading Mars Photos</h3>
                  <p className="text-sm text-gray-400">
                    Fetching the latest images from the Red Planet...
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayedPhotos.map((photo, index) => (
                  <PhotoCard 
                    key={photo.id} 
                    photo={photo} 
                    index={index} 
                    onClick={openImageModal} 
                  />
                ))}
              </div>
              
              <Pagination 
                page={page} 
                totalPages={totalPages} 
                setPage={setPage} 
                loading={loading} 
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
