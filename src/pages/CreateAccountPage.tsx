// src/pages/CreateAccountPage.tsx
import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import axios from 'axios';

const CreateAccountPage: React.FC = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    birthDate: '',
    mobileCallCode: '',
    mobileNumber: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/createAccount', formData);
      setMessage(`Account created successfully! Response: ${JSON.stringify(response.data)}`);
    } catch (error) {
      setMessage(`Error creating account: ${error.response?.data?.message || error.message}`);
    }
  };
  

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={5}>
        <Typography component="h1" variant="h5">Create Account</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="displayName"
            label="Display Name"
            name="displayName"
            autoComplete="displayName"
            autoFocus
            value={formData.displayName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="birthDate"
            label="Birth Date"
            name="birthDate"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.birthDate}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="mobileCallCode"
            label="Mobile Call Code"
            name="mobileCallCode"
            autoComplete="mobileCallCode"
            value={formData.mobileCallCode}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="mobileNumber"
            label="Mobile Number"
            name="mobileNumber"
            autoComplete="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Create Account
          </Button>
        </form>
        {message && <Typography variant="body1" color="textSecondary">{message}</Typography>}
      </Box>
    </Container>
  );
};

export default CreateAccountPage;
