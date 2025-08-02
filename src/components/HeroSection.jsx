import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Globe from './Globe';

const HeroSection = ({ setActiveSection }) => (
  <section id="home" className="relative bg-gradient-to-b from-gray-900 to-black text-white py-10 md:py-20 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 mb-6 text-sm font-medium text-amber-400 bg-amber-900/30 rounded-full backdrop-blur-sm"
          >
            Explore the Red Planet
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6"
          >
            Mars Rover
            <span className="text-amber-400 ml-2">Gallery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto lg:mx-0 text-lg text-gray-400 mb-8"
          >
            Discover stunning images captured by NASA's Mars rovers. Each photo tells a story of exploration and scientific discovery.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center lg:text-left"
          >
            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('gallery');
                document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 transition-colors duration-200"
            >
              View Gallery
              <FiArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </a>
          </motion.div>
        </div>
        <div className="hidden lg:block">
          <Globe />
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
