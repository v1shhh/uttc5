import React, { createContext, useContext, ReactNode, useRef } from 'react';
import { trackEvent } from './useAnalytics';

interface ExperimentContextType {
  getVariant: (experimentId: string, variants: string[], weights?: number[]) => string;
}

const ExperimentContext = createContext<ExperimentContextType | null>(null);

export const ExperimentProvider = ({ children }: { children: ReactNode }) => {
  const experimentsRef = useRef<Record<string, string>>({});

  // Initialize once on mount
  if (Object.keys(experimentsRef.current).length === 0) {
    try {
      experimentsRef.current = JSON.parse(localStorage.getItem('uttc_experiments') || '{}');
    } catch (e) {
      experimentsRef.current = {};
    }
  }

  const getVariant = (experimentId: string, variants: string[], weights?: number[]) => {
    if (experimentsRef.current[experimentId]) {
      return experimentsRef.current[experimentId];
    }

    // Default to uniform distribution if no weights
    const w = weights || variants.map(() => 1 / variants.length);
    const rand = Math.random();
    let cumulative = 0;
    
    let chosenVariant = variants[0];
    for (let i = 0; i < variants.length; i++) {
        cumulative += w[i];
        if (rand <= cumulative) {
            chosenVariant = variants[i];
            break;
        }
    }

    experimentsRef.current[experimentId] = chosenVariant;
    localStorage.setItem('uttc_experiments', JSON.stringify(experimentsRef.current));
    
    // Only track after confirming it is newly assigned
    setTimeout(() => {
      trackEvent('experiment_enrolled', experimentId, { variant: chosenVariant });
    }, 0);

    return chosenVariant;
  };

  return (
    <ExperimentContext.Provider value={{ getVariant }}>
      {children}
    </ExperimentContext.Provider>
  );
};

export const useExperiment = () => {
  const context = useContext(ExperimentContext);
  if (!context) {
    throw new Error('useExperiment must be used within an ExperimentProvider');
  }
  return context;
};

// Component Wrapper helper
export const ExperimentView = ({ 
  experimentId, 
  variants 
}: { 
  experimentId: string, 
  variants: Record<string, ReactNode> 
}) => {
  const { getVariant } = useExperiment();
  const keys = Object.keys(variants);
  const variant = getVariant(experimentId, keys);
  
  return <>{variants[variant]}</>;
};
