import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Vote.scss';

const Vote = () => {
  const { pollId } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    fetchPoll();
  }, [pollId]);

  async function fetchPoll() {
    try {
      const response = await fetch(`http://localhost:3000/poll/${pollId}`);
      if (response.ok) {
        const data = await response.json();
        setPoll(data);
      } else {
        console.error('Failed to fetch poll:', response.status);
      }
    } catch (error) {
      console.error('Error during poll fetching:', error);
    }
  }

  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
  }

  function handleSubmit() {
    const voteData = {
      option: selectedOption,
    };

    fetch(`http://localhost:3000/poll/${pollId}/vote`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(voteData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Vote submitted successfully');
          toast.success('Vote submitted successfully!');
          // Stay on the current page
        } else {
          console.error('Failed to submit vote');
        }
      })
      .catch((error) => {
        console.error('Error submitting vote:', error);
      });
  }

  if (!poll) {
    return <div>Loading...</div>;
  }

  // Calculate percentage for each option
  const calculatePercentage = (votes, totalVotes) => {
    if (totalVotes === 0) return 0;
    return ((votes / totalVotes) * 100).toFixed(2);
  };

  return (
    <div className="vote-container">
      <h2>Vote on Poll</h2>
      <p>Poll ID: {pollId}</p>

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

        <button type="button" onClick={() => navigate(`/poll/${pollId}/winner`)}>
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
