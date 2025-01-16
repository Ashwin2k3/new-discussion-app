import React, { useState, useEffect } from 'react';
import { addQuery, markResolved, getQueryStats } from '../services/api';
import StatsChart from './StatsChart';

const Query = ({ studentId }) => {
  const [queries, setQueries] = useState([]);
  const [message, setMessage] = useState('');
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data } = await getQueryStats();
    setStats(data);
  };

  const handleAddQuery = async () => {
    if (message.trim()) {
      await addQuery({ student: studentId, message });
      setMessage('');
      fetchStats();
    }
  };

  const handleResolveQuery = async (queryId) => {
    await markResolved(queryId);
    fetchStats();
  };

  return (
    <div>
      <h3>Query Resolution</h3>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Describe your query..."
      />
      <button onClick={handleAddQuery}>Add Query</button>

      <div>
        <h4>Stats</h4>
        <StatsChart stats={stats} />
      </div>
    </div>
  );
};

export default Query;