import React from 'react';
import './Poll.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePollCreation } from './pollHooks';

const Poll = () => {
  const {
    question,
    options,
    handleQuestionChange,
    handleOptionChange,
    handleAddOption,
    handleCreatePoll,
  } = usePollCreation();

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
