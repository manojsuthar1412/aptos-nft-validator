import React, { useState } from 'react';
import './UploadSection.css';

const API_BASE_URL = import.meta.env.VITE_BACKEND_API;

function UploadSection({ uploadedImage, setUploadedImage, setLoading, setAuthResult }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) {
      setPreview(URL.createObjectURL(file));
      setUploadedImage(file);
    } else {
      alert('Please upload a valid image file (max 10MB).');
    }
  };

  const checkAuthenticity = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('image', uploadedImage);

    try {
      const response = await fetch(`${API_BASE_URL}/validate-image`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      setAuthResult(result);
    } catch (error) {
      console.error('Error validating image:', error);
      setAuthResult({ valid: false, reason: 'Error validating image' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="upload-section">
      <div className="upload-controls">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={checkAuthenticity}>Check Authenticity</button>
      </div>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="image-preview"
        />
      )}
    </section>
  );
}

export default UploadSection;
