import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Vote.scss';
import { usePollFetching } from './voteHooks';

const Vote = () => {
  const {
    poll,
    selectedOption,
    handleOptionChange,
    handleSubmit,
    calculatePercentage,
    handleShowResults,
  } = usePollFetching();

  if (!poll) {
    return <div>Loading...</div>;
  }

  return (
    <div className="vote-container">
      <h2>Vote on Poll</h2>
      <p>Poll ID: {poll.pollId}</p>

      <h3>{poll.question}</h3>

      <form>
        <label>
          Select an option:
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="">Select</option>
            {poll.options.map((option) => (
              <option key={option.option} value={option.option}>
                {option.option}
              </option>
            ))}
          </select>
        </label>

        <button type="button" onClick={handleSubmit}>
          Submit Vote
        </button>

        <button type="button" onClick={handleShowResults}>
          Show Results
        </button>
      </form>

      <div className="options">
        {poll.options.map((option) => (
          <div key={option.option}>
            <p>{option.option}</p>
            <p>
              {calculatePercentage(option.votes, poll.totalVotes)}% Votes
              ({option.votes} out of {poll.totalVotes} Total Votes)
            </p>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Vote;
