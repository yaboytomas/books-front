import React from 'react';

const LoadingButton = ({ 
  children, 
  loading = false, 
  disabled = false, 
  type = 'button', 
  variant = 'primary', 
  size = 'default',
  onClick,
  className = '',
  ...props 
}) => {
  const isDisabled = disabled || loading;
  
  const baseClasses = 'btn transition-all';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    success: 'btn-success'
  };
  
  const sizeClasses = {
    sm: 'btn-sm',
    default: '',
    lg: 'btn-lg'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={classes}
      {...props}
    >
      {loading && (
        <div className="spinner mr-2" />
      )}
      {children}
    </button>
  );
};

export default LoadingButton; 