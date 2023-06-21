import { useEffect, useState } from 'react';

export function useToken() {
  const [token, setToken] = useState(false);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', JSON.stringify(token));
    }

    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'));
      setToken(data);
    }
  }, [token]);

  return { token, setToken };
}
