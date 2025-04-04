import React from 'react';

function ResultSection({ loading, setLoading, authResult, setMintResult }) {

  const mintNFT = () => {
    setLoading(true);
    setTimeout(() => {
      setMintResult({ success: true, txHash: '0x123456789abcdef' });
      setLoading(false);
    }, 2000);
  };

  return (
    <section className="result-section">
      {loading ? (
        <div className="loading-spinner"></div>
      ) : authResult ? (
        authResult.valid ? (
          <>
            <p>Ready to Mint</p>
            <button onClick={mintNFT}>Mint on Aptos</button>
          </>
        ) : (
          <p>Invalid image: {authResult.reason}</p>
        )
      ) : null}
    </section>
  );
}

export default ResultSection;
