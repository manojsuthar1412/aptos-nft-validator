import React, { useEffect, useState, useRef } from 'react';
import './History.css'; // Import the CSS file
import { useAptosWallet } from '../AptosWalletContext';

const API_BASE_URL = import.meta.env.VITE_BACKEND_API;

function History() {
  const [userHistory, setUserHistory] = useState([]);
  const [allHistory, setAllHistory] = useState([]);
  const abortControllerRef = useRef(null); // Ref to store the AbortController

  const { account } = useAptosWallet();

const CURRENT_USER_ADDRESS = account ? account?.address : '0x65929a3b7e7858160eee81241b865f72539d32baaa4625c0edf30d2513ea7c4c'; // Replace with dynamic user address


  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Cancel the previous request
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    fetch(`${API_BASE_URL}/mint-history`, { signal: abortController.signal })
      .then((response) => response.json())
      .then((data) => {
        setAllHistory(data.mint_history);
        setUserHistory(data.mint_history.filter((entry) => entry.creator_address === CURRENT_USER_ADDRESS));
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Previous request canceled');
        } else {
          console.error('Error fetching history:', error);
        }
      });

    return () => abortController.abort(); // Cleanup on unmount
  }, []);

  return (
    <div className="history" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {userHistory.length === 0 && allHistory.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#94a3b8' }}>
          <p>Loading history...</p>
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#f8fafc' }}>Your Minting History</h2>
          <table className="leaderboard-table" style={{ marginBottom: '40px', width: '100%' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Creator Address</th>
                <th>Transaction Hash</th>
                <th>Image</th>
                <th>Label</th>
                <th>Score</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {userHistory?.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.name}</td>
                  <td>{entry.description}</td>
                  <td style={{ wordBreak: 'break-word' }}>{entry.creator_address}</td>
                  <td style={{ wordBreak: 'break-word' }}>
                    <a
                      href={`https://explorer.aptos.dev/txn/${entry.txn_hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {entry.txn_hash}
                    </a>
                  </td>
                  <td>
                    <img src={entry.image_url} alt={entry.label} style={{ width: '50px', height: '50px', borderRadius: '4px' }} />
                  </td>
                  <td>{entry.label}</td>
                  <td>{entry.score}</td>
                  <td>{new Date(entry.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#f8fafc' }}>All History</h2>
          <table className="leaderboard-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Creator Address</th>
                <th>Transaction Hash</th>
                <th>Image</th>
                <th>Label</th>
                <th>Score</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {allHistory?.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.name}</td>
                  <td>{entry.description}</td>
                  <td style={{ wordBreak: 'break-word' }}>{entry.creator_address}</td>
                  <td style={{ wordBreak: 'break-word' }}>
                    <a
                      href={`https://explorer.aptos.dev/txn/${entry.txn_hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {entry.txn_hash}
                    </a>
                  </td>
                  <td>
                    <img src={entry.image_url} alt={entry.label} style={{ width: '50px', height: '50px', borderRadius: '4px' }} />
                  </td>
                  <td>{entry.label}</td>
                  <td>{entry.score}</td>
                  <td>{new Date(entry.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default History;
