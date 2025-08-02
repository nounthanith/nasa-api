import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Hide cursor when it leaves the window
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Check for hoverable elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isHoverable = 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.closest('[data-cursor="pointer"]');
      
      setIsHovered(!!isHoverable);
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className={`fixed w-8 h-8 rounded-full pointer-events-none z-150 mix-blend-difference ${
        isHovered ? 'bg-white' : 'bg-amber-400 scale-100'
      }`}
      style={{
        left: `${position.x - 12}px`,
        top: `${position.y - 12}px`,
      }}
      animate={{
        scale: isHovered ? 0.5 : 1,
        transition: { type: 'spring', stiffness: 500, damping: 28 },
      }}
    >
      <div className="absolute inset-0 rounded-full bg-current opacity-30 animate-ping" />
    </motion.div>
  );
};

export default CustomCursor;
