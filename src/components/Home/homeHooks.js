import { useState, useEffect } from 'react';

export function usePolls() {
  const [polls, setPolls] = useState([]);

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

  return polls;
}
