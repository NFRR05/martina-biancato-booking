import React from 'react';
import './CleanInputField.css';

export default function CleanInputField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  prefix,
  optional = false,
  error,
  helperText,
  rows = 3
}) {
  const isTextarea = type === 'textarea';

  return (
    <div className="clean-input-group">
      <div className="clean-input-header">
        <label htmlFor={id} className="clean-input-label">
          {label}
        </label>
        {optional && <span className="clean-input-optional">(facoltativo)</span>}
      </div>

      <div
        className={`clean-input-box ${isTextarea ? 'clean-textarea-box' : ''} ${
          error ? 'error' : ''
        }`}
      >
        {prefix && <span className="clean-input-prefix">{prefix}</span>}

        {isTextarea ? (
          <textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="clean-input-native"
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="clean-input-native"
          />
        )}
      </div>

      {error && <span className="clean-input-error">{error}</span>}
      {helperText && !error && <span className="clean-input-helper">{helperText}</span>}
    </div>
  );
}
