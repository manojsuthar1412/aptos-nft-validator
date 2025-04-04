import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const API_BASE_URL = import.meta.env.VITE_BACKEND_API;

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [activeTab, setActiveTab] = useState('Table');

  useEffect(() => {
    fetch(`${API_BASE_URL}/leaderboard`)
      .then((response) => response.json())
      .then((data) => setLeaderboardData(data))
      .catch((error) => console.error('Error fetching leaderboard:', error));
  }, []);

  const chartData = {
    labels: leaderboardData.map((entry) => entry.address),
    datasets: [
      {
        label: 'Minted Tokens',
        data: leaderboardData.map((entry) => entry.minted),
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
        borderColor: ['#388e3c', '#1976d2', '#f57c00'],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="leaderboard">
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
            {leaderboardData.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.address}</td>
                <td>{entry.minted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="chart-container">
          <Pie data={chartData} />
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
