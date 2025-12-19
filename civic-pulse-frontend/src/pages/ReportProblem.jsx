import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProblem } from '../context/ProblemContext';
import { useAuth } from '../context/AuthContext';
import { categories } from '../data/sampleData';
import MapPicker from '../components/MapPicker';
import { PhotoIcon, MapPinIcon } from '@heroicons/react/24/outline';

const ReportProblem = () => {
  const navigate = useNavigate();
  const { addProblem } = useProblem();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Roads',
    location: null,
    imageFile: null
  });

  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Store the actual file for upload
      setFormData({ ...formData, imageFile: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validation
    if (!formData.title || !formData.description) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (!formData.location) {
      setError('Please select a location on the map');
      setLoading(false);
      return;
    }

    // Create problem data for backend
    const problemData = {
      title: formData.title,
      description: formData.description,
      location: formData.location.address, // Backend expects location as string
      image: formData.imageFile // File object for upload
    };

    const result = await addProblem(problemData);

    if (result.success) {
      setSuccess('Problem reported successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      setError(result.error || 'Failed to report problem');
      setLoading(false);
    }
  };

  return (
    <div className="report-container animate-fade-in">
      <div className="report-card">
        <h1 className="report-title">Report a Problem</h1>
        <p className="report-subtitle">Help improve your community by reporting civic issues</p>

        {error && (
          <div className="error-message animate-slide-up">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message animate-slide-up" style={{backgroundColor: '#10b981', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem'}}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="report-form">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              placeholder="Brief description of the problem"
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field"
              placeholder="Provide detailed information about the problem"
              required
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="input-field"
              required
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="form-group">
            <label className="form-label">
              <MapPinIcon style={{width: '1.25rem', height: '1.25rem', display: 'inline-block', marginRight: '0.25rem'}} />
              Location <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-500 mb-3">Click on the map to select the problem location</p>
            <MapPicker
              location={formData.location}
              setLocation={(loc) => setFormData({ ...formData, location: loc })}
            />
            {formData.location && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {formData.location.address}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label className="form-label">
              <PhotoIcon style={{width: '1.25rem', height: '1.25rem', display: 'inline-block', marginRight: '0.25rem'}} />
              Upload Image (Optional)
            </label>
            <div className="image-upload-section">
              {imagePreview ? (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview('');
                      setFormData({ ...formData, imageFile: null });
                    }}
                    className="remove-image-button"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <PhotoIcon style={{width: '3rem', height: '3rem', color: '#9ca3af', margin: '0 auto'}} />
                  <div className="flex justify-center text-sm text-gray-600 mt-2">
                    <label htmlFor="file-upload" className="image-upload-label">
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="image-upload-input"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1"
              style={{opacity: loading ? 0.5 : 1}}
            >
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportProblem;

