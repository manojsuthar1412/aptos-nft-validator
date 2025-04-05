import React, { useEffect, useState, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const API_BASE_URL = import.meta.env.VITE_BACKEND_API;

function Stats() {
  const [statsData, setStatsData] = useState({
    total_uploads: 0,
    total_valid_mints: 0,
    total_rejected: 0,
    average_score: 0,
  });

  const abortControllerRef = useRef(null); // Ref to store the AbortController

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Cancel the previous request
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    fetch(`${API_BASE_URL}/stats`, { signal: abortController.signal })
      .then((response) => response.json())
      .then((data) => setStatsData(data))
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Previous request canceled');
        } else {
          console.error('Error fetching stats:', error);
        }
      });

    return () => abortController.abort(); // Cleanup on unmount
  }, []);

  const chartData = {
    labels: ['Valid Mints', 'Rejected'],
    datasets: [
      {
        data: [statsData.total_valid_mints, statsData.total_rejected],
        backgroundColor: ['#81c784', '#e57373'], // Lighter green and red
        borderColor: ['#66bb6a', '#ef5350'], // Slightly darker shades for borders
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="stats">
      {statsData.total_uploads === 0 && statsData.total_valid_mints === 0 && statsData.total_rejected === 0 ? (
        <div style={{ textAlign: 'center', color: '#94a3b8' }}>
          <p>Loading stats...</p>
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#f8fafc' }}>Project Stats</h2>
          <div className="stats-cards" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
            <div className="card" style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', textAlign: 'center', color: '#f8fafc' }}>
              <h3>Total Uploads</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{statsData.total_uploads}</p>
            </div>
            <div className="card" style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', textAlign: 'center', color: '#f8fafc' }}>
              <h3>Average Score</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{statsData.average_score.toFixed(4)}</p>
            </div>
          </div>
          <div className="chart-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Pie data={chartData} />
          </div>
        </>
      )}
    </div>
  );
}

export default Stats;
