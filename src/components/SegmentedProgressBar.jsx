import React from 'react';
import { ArrowLeft } from 'lucide-react';
import './SegmentedProgressBar.css';

export default function SegmentedProgressBar({
  currentStep,
  totalSteps,
  title,
  subtitle,
  onBack,
  showBack = true
}) {
  return (
    <div className="clean-stepper">
      <div className="clean-stepper-top">
        {showBack && onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="clean-back-btn"
            aria-label="Indietro"
          >
            <ArrowLeft size={14} />
            <span>Indietro</span>
          </button>
        ) : (
          <div style={{ width: 60 }} />
        )}

        <div className="clean-step-indicator">
          Passo <strong>{currentStep}</strong> di {totalSteps}
        </div>
      </div>

      <div className="clean-stepper-bars">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNumber = i + 1;
          const isFilled = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          return (
            <div
              key={stepNumber}
              className={`clean-stepper-bar ${isFilled ? 'filled' : ''} ${
                isCurrent ? 'current' : ''
              }`}
            />
          );
        })}
      </div>

      {title && (
        <div className="clean-stepper-titles">
          <h2 className="clean-stepper-heading">{title}</h2>
          {subtitle && <p className="clean-stepper-sub">{subtitle}</p>}
        </div>
      )}
    </div>
  );
}
