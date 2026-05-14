import React, { ReactNode } from 'react';
import { motion } from 'motion/react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const ScrollReveal: React.FC<{ children: ReactNode, delay?: number, threshold?: number, className?: string, style?: React.CSSProperties }> = ({ children, delay = 0, threshold = 0.15, className = '', style = {} }) => {
  const { ref, isVisible } = useScrollReveal(threshold);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] as any }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
