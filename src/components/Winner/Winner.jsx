import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Winner.scss';

const Winner = () => {
  const { pollId } = useParams();
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    fetchWinner();
  }, []);

  async function fetchWinner() {
    try {
      const response = await fetch(`http://localhost:3000/poll/${pollId}/winner`);
      if (response.ok) {
        const data = await response.json();
        setWinner(data);
      } else {
        console.error('Failed to fetch winner:', response.status);
      }
    } catch (error) {
      console.error('Error during winner fetching:', error);
    }
  }

  if (!winner) {
    return <div>Loading winner...</div>;
  }

  return (
    <div className="winner-container">
      <h2>Winner</h2>
      <p>Option: {winner.option}</p>
      <p>Votes: {winner.votes}</p>
    </div>
  );
};

export default Winner;
