import { useEffect, useRef, useState } from 'react';

export const useScrollReveal = (options?: any) => {
  const ref = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(true); // just default to true
  return { ref, isVisible };
};
