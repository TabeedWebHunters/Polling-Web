import React from 'react';
import './Winner.scss';
import { useWinnerFetching } from './winnerHooks';

const Winner = () => {
  const { winner } = useWinnerFetching();

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
