import React, { useState } from 'react';
import './Poll.scss';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Poll = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([{ option: '' }]);
  const navigate = useNavigate();

  function handleQuestionChange(event) {
    setQuestion(event.target.value);
  }

  function handleOptionChange(index, event) {
    const newOptions = [...options];
    newOptions[index].option = event.target.value;
    setOptions(newOptions);
  }

  function handleAddOption() {
    setOptions([...options, { option: '' }]);
  }

  function handleCreatePoll() {
    const pollData = {
      question,
      options,
    };

    fetch('http://localhost:3000/poll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pollData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Poll created successfully');
          toast.success('Poll created successfully!', {
            onClose: () => navigate('/home'), 
          });
        } else {
          console.error('Failed to create poll');
        }
      })
      .catch((error) => {
        console.error('Error creating poll:', error);
      });
  }

  return (
    <div className="poll-container">
      <h2 className="poll-title">Create a New Poll</h2>

      <div className="poll-form">
        <label className="poll-label">Question:</label>
        <input
          type="text"
          className="poll-input"
          value={question}
          onChange={handleQuestionChange}
        />

        <label className="poll-label">Options:</label>
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            className="poll-input"
            value={option.option}
            onChange={(event) => handleOptionChange(index, event)}
          />
        ))}

        <button className="add-option-btn" onClick={handleAddOption}>
          Add Option
        </button>

        <button className="create-poll-btn" onClick={handleCreatePoll}>
          Create Poll
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Poll;
