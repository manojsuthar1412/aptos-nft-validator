import React, { useState } from 'react';

function ResultSection({ uploadedImage, setAuthResult, authResult, setMintResult }) {
  const [loading, setLoading] = useState(false);

  const checkAuthenticity = async () => {
    setLoading(true);
    // Simulate backend response
    setTimeout(() => {
      const isValid = Math.random() > 0.1; // Random validity for demo
      setAuthResult(isValid ? { valid: true } : { valid: false, reason: 'Duplicate image' });
      setLoading(false);
    }, 2000);
  };

  const mintNFT = () => {
    // Simulate minting process
    setMintResult({ success: true, txHash: '0x123456789abcdef' });
  };

  return (
    <section className="result-section">
      {loading ? (
        <p>Loading...</p>
      ) : authResult ? (
        authResult.valid ? (
          <>
            <p>Ready to Mint</p>
            <button onClick={mintNFT}>Mint on Aptos</button>
          </>
        ) : (
          <p>Invalid image: {authResult.reason}</p>
        )
      ) : (
        <button onClick={checkAuthenticity}>Check Authenticity</button>
      )}
    </section>
  );
}

export default ResultSection;
