import axios from 'axios';

const API_URL = 'http://localhost:8081/api'; 

export const markEntry = async (token) => {
  const now = new Date();
  const date = now.toISOString().split('T')[0]; 
  const entryTime = now.toTimeString().split(' ')[0].slice(0,5); 
  const response = await axios.post(`${API_URL}/sessions/entry`, 
    {
      date,
      entryTime
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const markExit = async (token) => {
  const now = new Date();
  const date = now.toISOString().split('T')[0]; 
  const exitTime = now.toTimeString().split(' ')[0].slice(0,5); 
  const response = await axios.post(`${API_URL}/sessions/exit`, 
    {
      date,
      exitTime
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const markResume = async (token) => {
  const now = new Date();
  const date = now.toISOString().split('T')[0]; 
  const response = await axios.get(`${API_URL}/sessions/resume?date=${date}`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
