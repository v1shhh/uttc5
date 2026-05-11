import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { trackEvent } from '../../hooks/useAnalytics';

const steps = [
  {
    id: 'type',
    title: "What are you planning to build?",
    options: [
      { id: 'residential', label: 'Private Villa Pool', icon: '🏡', cost: 1 },
      { id: 'commercial', label: 'Commercial / Hotel', icon: '🏨', cost: 2.5 },
      { id: 'water_feature', label: 'Water Feature / Fountain', icon: '⛲', cost: 1.2 }
    ]
  },
  {
    id: 'size',
    title: "Estimated size of the project?",
    options: [
      { id: 'small', label: 'Classic (up to 40sqm)', icon: '🏊', cost: 80000 },
      { id: 'medium', label: 'Premier (40-80sqm)', icon: '🏊‍♀️', cost: 150000 },
      { id: 'large', label: 'Olympic/Grand (80sqm+)', icon: '🌊', cost: 350000 }
    ]
  },
  {
    id: 'features',
    title: "Any special additions?",
    multi: true,
    options: [
      { id: 'infinity', label: 'Infinity Edge', icon: '✨', cost: 35000 },
      { id: 'heating', label: 'Heat & Cool Pump', icon: '🔥', cost: 12000 },
      { id: 'lighting', label: 'Smart Lighting', icon: '💡', cost: 8000 },
      { id: 'automation', label: 'Auto-Chemistry', icon: '🤖', cost: 15000 }
    ]
  }
];

export default function BudgetCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<any>({});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    trackEvent('form_start', 'budget_calculator');
  }, []);

  const handleSelect = (optionId: string) => {
    const stepId = steps[currentStep].id;
    if (steps[currentStep].multi) {
      const prev = selections[stepId] || [];
      const next = prev.includes(optionId) ? prev.filter((i: string) => i !== optionId) : [...prev, optionId];
      setSelections({ ...selections, [stepId]: next });
    } else {
      setSelections({ ...selections, [stepId]: optionId });
      trackEvent('form_step_complete', 'budget_calculator', { step: currentStep, option: optionId });
      setTimeout(() => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
        else finishForm();
      }, 300);
    }
  };

  const finishForm = () => {
    trackEvent('form_submit', 'budget_calculator', { selections, calculatedTotal: calculateTotal() });
    setShowResult(true);
  };

  const calculateTotal = () => {
    let base = 0;
    const sizeOpt = steps[1].options.find(o => o.id === selections.size);
    if (sizeOpt) base = sizeOpt.cost;

    const typeOpt = steps[0].options.find(o => o.id === selections.type);
    if (typeOpt) base *= typeOpt.cost;

    const selectedFeatures = selections.features || [];
    selectedFeatures.forEach((fId: string) => {
      const feat = steps[2].options.find(o => o.id === fId);
      if (feat) base += feat.cost;
    });

    return base;
  };

  const reset = () => {
    trackEvent('form_reset', 'budget_calculator');
    setCurrentStep(0);
    setSelections({});
    setShowResult(false);
  };

  return (
    <div className="glass-card" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', minHeight: '400px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            style={{ width: '100%' }}
          >
            <div style={{ fontSize: '12px', color: 'var(--color-aqua)', marginBottom: '1rem', fontWeight: 600, letterSpacing: '2px' }}>
              STEP {currentStep + 1} OF {steps.length}
            </div>
            <h3 style={{ fontSize: '24px', marginBottom: '2rem', color: 'var(--color-foam)' }}>{steps[currentStep].title}</h3>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              {steps[currentStep].options.map(opt => {
                const isSelected = steps[currentStep].multi 
                  ? (selections[steps[currentStep].id] || []).includes(opt.id)
                  : selections[steps[currentStep].id] === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1.2rem',
                      background: isSelected ? 'rgba(0, 180, 216, 0.1)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isSelected ? 'var(--color-aqua)' : 'var(--color-glass-border)'}`,
                      borderRadius: '4px',
                      color: isSelected ? 'var(--color-aqua)' : 'var(--color-text)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontSize: '16px'
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>{opt.icon}</span>
                    <span style={{ fontWeight: 500 }}>{opt.label}</span>
                    {isSelected && <span style={{ marginLeft: 'auto' }}>✓</span>}
                  </button>
                );
              })}
            </div>

            {steps[currentStep].multi && (
              <button 
                onClick={() => {
                  trackEvent('form_step_complete', 'budget_calculator', { step: currentStep, option: selections[steps[currentStep].id] });
                  if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
                  else finishForm();
                }}
                className="btn-primary" 
                style={{ width: '100%', marginTop: '2rem' }}
              >
                Continue →
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}
          >
            <div style={{ fontSize: '13px', color: 'var(--color-text-dim)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Estimated Investment</div>
            <div style={{ fontSize: '48px', fontFamily: 'var(--font-impact)', color: 'var(--color-gold)', marginBottom: '1rem' }}>
              AED {calculateTotal().toLocaleString()}*
            </div>
            <p style={{ fontSize: '14px', color: 'var(--color-text-dim)', maxWidth: '400px', marginBottom: '2rem' }}>
              *This is a preliminary engineering estimate based on UAE market averages. Landmark projects with premium finishes or complex civil works require a detailed site survey.
            </p>
            
            <div className="budget-results-btns">
              <button onClick={reset} style={{ flex: 1, padding: '12px', background: 'none', border: '1px solid var(--color-glass-border)', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>Recalculate</button>
              <a href="#contact" className="btn-primary" style={{ flex: 2, textAlign: 'center' }}>Get Accurate Quote →</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .budget-results-btns {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }
        @media (min-width: 480px) {
          .budget-results-btns {
            flex-direction: row;
          }
        }
      `}</style>
    </div>
  );
}
