import React from 'react';

const FormInput = ({ 
  label, 
  id, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
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
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`form-input ${error ? 'border-danger' : ''} ${className}`}
        {...props}
      />
      {error && (
        <div className="text-danger text-sm mt-1">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormInput; 