import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from "@mui/material";
import standardRequest from "../../utils/standardRequest";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await standardRequest.post('/api/v1/login', { email, password });
      console.log("Login successful", response.data)
      navigate('/');
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid email or password");
    }
  };

  return (
    <Container>
      <Box sx={{ height: '100vh'}} justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'}>
        <Typography variant="h2" gutterBottom>Login</Typography>
        <p>Use the form below to login</p>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button variant="contained" color="primary" type="submit">Login</Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;