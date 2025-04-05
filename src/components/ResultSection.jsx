import React, { useState, useRef, useEffect } from 'react';
import { useAptosWallet } from '../AptosWalletContext';
import './ResultSection.css'; // Import the CSS file
const API_BASE_URL = import.meta.env.VITE_BACKEND_API;

function ResultSection({ loading, setLoading, authResult, setMintResult, setAuthResult }) {

  const { account, isConnected, connectWallet} = useAptosWallet();
  const [mintPayload, setMintPayload] = useState({
    name: '',
    description: ''
  })
  const abortControllerRef = useRef(null); // Ref to store the AbortController
  const loadingMessages = [
    "Booting up AI guardians...",
    "Analyzing image authenticity...",
    "Running ML model inference...",
    "Checking NFT eligibility...",
    "Validating visual uniqueness...",
    "Verifying originality of artwork...",
    "Scanning for near-duplicates...",
    "Ensuring image integrity...",
    "AI cross-checking NFT standards...",
    "Applying authenticity checks...",
    "Loading AI-powered security...",
    "Processing image fingerprint...",
    "Comparing against NFT database...",
    "Running authenticity filters...",
    "Optimizing mint readiness...",
    "Enhancing image validation...",
    "Model warming up, please wait...",
    "Deploying NFT safeguards...",
    "Finalizing AI verification...",
    "Securing your digital asset..."
  ];
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState('');

  useEffect(() => {
    let intervalId;
    if (loading) {
      intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * loadingMessages.length);
        setCurrentLoadingMessage(loadingMessages[randomIndex]);
      }, 1000);
    }
    return () => clearInterval(intervalId); // Cleanup interval on unmount or when loading stops
  }, [loading]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setMintPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const mintNFT = async() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Cancel the previous request
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    const formData = new FormData();
    formData.append('receiver_address', account?.address);
    formData.append('image_url', authResult.image_url);
    formData.append('name', mintPayload.name);
    formData.append('description',  mintPayload.description);
    formData.append('label', authResult.label);
    formData.append('score', authResult.score);
    formData.append('embedding', authResult.embedding);
    try {
      const response = await fetch(`${API_BASE_URL}/mint-nft`, {
        method: 'POST',
        body: formData,
        signal: abortController.signal, // Attach the signal
      });
      const result = await response.json();
      setMintResult(result);
      if (result.status === 'success') {
        setAuthResult(null); // Clear authResult on successful mint
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Previous request canceled');
      } else {
        console.error('Error validating image:', error);
        setMintResult({status: 'error', reason: 'Error validating image'});
      }
    } finally {
      setLoading(false);
    }

  };
  

  return (
    <section className="result-section">
      {loading ? (
        <>
          <div className="loading-spinner"></div>
          <span>{currentLoadingMessage}</span>
        </>
      ) : authResult ? (
        authResult.status == 'valid' ? (
          <>
            <p>Ready to Mint</p>
            <p>Label: {authResult.label}</p>
            <p>Score: {authResult.score*100}%</p>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter NFT Name"
                onChange={handleFormChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-label">Description</label>
              <input
                type="text"
                name="description"
                placeholder="Enter NFT Description"
                onChange={handleFormChange}
                className="form-input"
              />
            </div>
            {isConnected ? (
              <button onClick={mintNFT}>Mint on Aptos</button>
            ) : (
              <button onClick={connectWallet}>Connect to wallet to Mint</button>
            )}
          </>
        ) : (
          <p>Invalid image: {authResult.reason}</p>
        )
      ) : null}
    </section>
  );
}

export default ResultSection;
