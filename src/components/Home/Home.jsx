import React from 'react';
import './Home.scss';
import { useNavigate } from 'react-router-dom';
import { usePolls } from './homeHooks';

const Home = () => {
  const polls = usePolls();
  const navigate = useNavigate();

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
