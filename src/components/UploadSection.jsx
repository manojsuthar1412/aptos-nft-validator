import React, { useState, useRef } from 'react';
import './UploadSection.css';

const API_BASE_URL = import.meta.env.VITE_BACKEND_API;

function UploadSection({ preview, setPreview, uploadedImage, setUploadedImage, setLoading, setAuthResult }) {
  const abortControllerRef = useRef(null); // Ref to store the AbortController

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
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Cancel the previous request
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', uploadedImage);

    try {
      const response = await fetch(`${API_BASE_URL}/validate-image`, {
        method: 'POST',
        body: formData,
        signal: abortController.signal, // Attach the signal
      });
      const result = await response.json();
      setAuthResult(result);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Previous request canceled');
      } else {
        console.error('Error validating image:', error);
        setAuthResult({ valid: false, reason: 'Error validating image' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="upload-section">
      <div className="upload-controls">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={checkAuthenticity} disabled={!uploadedImage}>
          Check Authenticity
        </button>
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
