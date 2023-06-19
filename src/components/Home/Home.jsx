import React, { useState, useEffect } from 'react';
import './Home.scss';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [polls, setPolls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPolls();
  }, []);

  async function fetchPolls() {
    try {
      const response = await fetch('http://localhost:3000/poll/');
      if (response.ok) {
        const data = await response.json();
        setPolls(data);
      } else {
        console.error('Failed to fetch polls:', response.status);
      }
    } catch (error) {
      console.error('Error during poll fetching:', error);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('token');
    navigate('/');
  }

  function handleCreatePoll() {
    navigate('/poll');
  }

  function handleVote(pollId) {
    navigate(`/vote/${pollId}`);
  }

  return (
    <div className="home-container">
      <h2 className="home-title">Welcome to the Polling Page!!</h2>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <button className="create-poll-btn" onClick={handleCreatePoll}>
        Create New Poll
      </button>

      <div className="polls">
        {polls.map((poll) => (
          <div className="poll" key={poll.id} onClick={() => handleVote(poll.id)}>
            <h3>{poll.question}</h3>
            <ul>
              {poll.options.map((option) => (
                <li key={option.id}>{option.option}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
