import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function usePollFetching() {
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
        } else {
          console.error('Failed to submit vote');
        }
      })
      .catch((error) => {
        console.error('Error submitting vote:', error);
      });
  }

  function calculatePercentage(votes, totalVotes) {
    if (totalVotes === 0) return 0;
    return ((votes / totalVotes) * 100).toFixed(2);
  }

  function handleShowResults() {
    navigate(`/poll/${pollId}/winner`);
  }

  return {
    poll,
    selectedOption,
    handleOptionChange,
    handleSubmit,
    calculatePercentage,
    handleShowResults,
  };
}
