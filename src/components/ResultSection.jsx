import React, { useState } from 'react';
import { useAptosWallet } from '../AptosWalletContext';
const API_BASE_URL = import.meta.env.VITE_BACKEND_API;


function ResultSection({ loading, setLoading, authResult, setMintResult }) {

  const { account, isConnected, connectWallet} = useAptosWallet();
  const [mintPayload, setMintPayload] = useState({
    name: '',
    description: ''
  })
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setMintPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const mintNFT = async() => {
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
      });
      const result = await response.json();
      setMintResult(result);
    } catch (error) {
      console.error('Error validating image:', error);
      setMintResult({status: 'error', reason: 'Error validating image'});
    } finally {
      setLoading(false);
    }

  };

  const loadHelperMsg = () => {
    const randomIndex = Math.floor(Math.random() * loadingMessages.length);
    return loadingMessages[randomIndex];
  }
  

  return (
    <section className="result-section">
      {loading ? (
        <>
          <div className="loading-spinner"></div>
          <span>{loadHelperMsg()}</span>
        </>
      ) : authResult ? (
        authResult.status == 'valid' ? (
          <>
            <p>Ready to Mint</p>
            <p>Label: {authResult.label}</p>
            <p>Score: {authResult.score*100}%</p>
            <input type="text" name="name" onChange={handleFormChange} />
            <label htmlFor="name">Name</label>
            <input type="text" name="description" onChange={handleFormChange}  />
            <label htmlFor="description">description</label>
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
