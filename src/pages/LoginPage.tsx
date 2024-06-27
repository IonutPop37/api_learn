import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setIpAddress(response.data.ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    fetchIpAddress();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userAgent = navigator.userAgent;

    try {
      const response = await axios.post('https://api-staging.just4myfans.com/login', {
        username,
        password,
        ipAddress: '192.168.1.1', // Dacă dorești să folosești IP fix
        userAgent
      });

      console.log(response.data);

      const { accessToken, refreshToken, '2fa': twoFA } = response.data;

      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('2fa', twoFA.toString());

      console.log(localStorage);

      router.push('/SearchUsers');
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Error logging in. Please check your credentials and try again.');
    }
  };

  return (
    <Container maxWidth="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Box mt={4} mb={2}>
        <Typography variant="h4" align="center">Login</Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField
              label="Nume Utilizator"
              variant="outlined"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Parola"
              variant="outlined"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button variant="contained" color="primary" type="submit">
              Autentificare
            </Button>
          </Box>
        </form>
        {message && <Typography variant="h6" color="error" align="center">{message}</Typography>}
      </Box>
    </Container>
  );
};

export default LoginPage;
