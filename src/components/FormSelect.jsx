import React from 'react';

const FormSelect = ({ 
  label, 
  id, 
  value, 
  onChange, 
  options, 
  required = false, 
  error,
  className = '',
  ...props 
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`form-input ${error ? 'border-danger' : ''} ${className}`}
        {...props}
      >
        <option value="">Select {label?.toLowerCase() || 'an option'}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <div className="text-danger text-sm mt-1">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormSelect; 