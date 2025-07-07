import React, { useState } from 'react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import LoadingButton from './LoadingButton';

const BookForm = ({ 
  initialData = { title: '', author: '', genre: '', publishedDate: '' }, 
  onSubmit, 
  loading = false, 
  submitText = 'Save', 
  title = 'Book Form',
  showCancel = true,
  onCancel 
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (!formData.genre.trim()) {
      newErrors.genre = 'Genre is required';
    }
    
    if (!formData.publishedDate) {
      newErrors.publishedDate = 'Published date is required';
    } else {
      const date = new Date(formData.publishedDate);
      const today = new Date();
      if (date > today) {
        newErrors.publishedDate = 'Published date cannot be in the future';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const genres = [
    { value: 'Fiction', label: 'Fiction' },
    { value: 'Non-Fiction', label: 'Non-Fiction' },
    { value: 'Mystery', label: 'Mystery' },
    { value: 'Science Fiction', label: 'Science Fiction' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Thriller', label: 'Thriller' },
    { value: 'Horror', label: 'Horror' },
    { value: 'Biography', label: 'Biography' },
    { value: 'History', label: 'History' },
    { value: 'Self-Help', label: 'Self-Help' },
    { value: 'Business', label: 'Business' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Science', label: 'Science' },
    { value: 'Arts', label: 'Arts' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Cooking', label: 'Cooking' },
    { value: 'Health', label: 'Health' },
    { value: 'Religion', label: 'Religion' },
    { value: 'Philosophy', label: 'Philosophy' },
    { value: 'Poetry', label: 'Poetry' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Other', label: 'Other' }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="📖 Book Title"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter the book title"
            required
            error={errors.title}
          />

          <FormInput
            label="👤 Author"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter the author's name"
            required
            error={errors.author}
          />

          <FormSelect
            label="📚 Genre"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            options={genres}
            required
            error={errors.genre}
          />

          <FormInput
            label="📅 Published Date"
            id="publishedDate"
            name="publishedDate"
            type="date"
            value={formData.publishedDate}
            onChange={handleChange}
            required
            error={errors.publishedDate}
          />

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <LoadingButton
              type="submit"
              loading={loading}
              variant="primary"
              className="flex-1"
            >
              {submitText}
            </LoadingButton>
            
            {showCancel && (
              <LoadingButton
                type="button"
                variant="secondary"
                onClick={onCancel}
                className="flex-1"
              >
                Cancel
              </LoadingButton>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm; 