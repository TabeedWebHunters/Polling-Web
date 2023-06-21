import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function usePollCreation() {
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

  return {
    question,
    options,
    handleQuestionChange,
    handleOptionChange,
    handleAddOption,
    handleCreatePoll,
  };
}
