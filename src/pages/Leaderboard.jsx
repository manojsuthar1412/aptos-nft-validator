import React, { useEffect, useState, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const API_BASE_URL = import.meta.env.VITE_BACKEND_API;

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [activeTab, setActiveTab] = useState('Table');
  const abortControllerRef = useRef(null); // Ref to store the AbortController

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Cancel the previous request
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    fetch(`${API_BASE_URL}/leaderboard`, { signal: abortController.signal })
      .then((response) => response.json())
      .then((data) => setLeaderboardData(data.leaderboard))
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Previous request canceled');
        } else {
          console.error('Error fetching leaderboard:', error);
        }
      });

    return () => abortController.abort(); // Cleanup on unmount
  }, []);

  const chartData = leaderboardData?.length > 0 && {
    labels: leaderboardData?.map((entry) => entry.creator_address),
    datasets: [
      {
        label: 'Minted Tokens',
        data: leaderboardData?.map((entry) => entry.mint_count),
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
        borderColor: ['#388e3c', '#1976d2', '#f57c00'],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="leaderboard">
      {leaderboardData.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#94a3b8' }}>
          <p>Loading leaderboard...</p>
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <div className="tab-menu">
            <button
              className={activeTab === 'Table' ? 'active' : ''}
              onClick={() => setActiveTab('Table')}
            >
              Table
            </button>
            <button
              className={activeTab === 'Chart' ? 'active' : ''}
              onClick={() => setActiveTab('Chart')}
            >
              Chart
            </button>
          </div>
          {activeTab === 'Table' ? (
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Address</th>
                  <th>Minted Tokens</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData?.map((entry, index) => (
                  <tr key={index}>
                    <td>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                    </td>
                    <td>{entry.creator_address}</td>
                    <td>{entry.mint_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="chart-container">
              <Pie data={chartData} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Leaderboard;
