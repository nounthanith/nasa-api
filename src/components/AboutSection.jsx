import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const AboutSection = () => (
  <section id="about" className="py-16 bg-gray-900/50 border-t border-gray-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">About Mars Explorer</span>
          <span className="block text-amber-500 text-xl mt-2">Discover the Red Planet</span>
        </h2>
      </motion.div>
      
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg text-gray-300 mb-6">
            Mars Explorer is a web application that showcases high-resolution images captured by NASA's Mars rovers. 
            These images provide a unique glimpse into the Martian landscape, captured by the Curiosity rover's 
            suite of scientific instruments.
          </p>
          <p className="text-lg text-gray-300 mb-8">
            The Curiosity rover has been exploring Gale Crater on Mars since August 2012, searching for signs of 
            past microbial life and studying the planet's climate and geology to prepare for future human exploration.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://mars.nasa.gov/msl/home/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 transition-colors duration-200"
            >
              Learn More
              <FiArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-800/30 rounded-xl p-6 border border-gray-800/50"
        >
          <h3 className="text-xl font-bold text-white mb-6">Featured Rovers</h3>
          <div className="space-y-6">
            {[
              {
                name: 'Curiosity',
                launch: 'November 26, 2011',
                landing: 'August 6, 2012',
                status: 'Active',
                description: 'Exploring Gale Crater to study Mars\'s climate and geology.'
              },
              {
                name: 'Perseverance',
                launch: 'July 30, 2020',
                landing: 'February 18, 2021',
                status: 'Active',
                description: 'Searching for signs of ancient life and collecting samples.'
              },
              {
                name: 'Opportunity',
                launch: 'July 7, 2003',
                landing: 'January 25, 2004',
                status: 'Mission Complete',
                description: 'Operated for 15 years, far exceeding its planned 90-day mission.'
              }
            ].map((rover, index) => (
              <motion.div 
                key={rover.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                className="border-l-4 border-amber-500 pl-4 py-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-white">{rover.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    rover.status === 'Active' 
                      ? 'bg-green-900/50 text-green-400' 
                      : 'bg-gray-700/50 text-gray-400'
                  }`}>
                    {rover.status}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mt-1">{rover.description}</p>
                <div className="flex space-x-4 mt-2">
                  <span className="text-xs text-gray-400 flex items-center">
                    <span className="text-amber-400 mr-1">🚀</span> {rover.launch}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center">
                    <span className="text-amber-400 mr-1">🌍</span> {rover.landing}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
