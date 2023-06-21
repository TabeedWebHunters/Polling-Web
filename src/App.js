import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Poll from './components/Polls/Poll';
import Vote from './components/Vote/Vote';
import Winner from './components/Winner/Winner';
import { useToken } from './appHooks';

const App = () => {
  const { token, setToken } = useToken();

  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login setToken={setToken} />} />
            {token ? (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/poll" element={<Poll />} />
                <Route path="/vote/:pollId" element={<Vote />} />
                <Route path="/poll/:pollId/winner" element={<Winner />} />
              </>
            ) : (
              ''
            )}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
