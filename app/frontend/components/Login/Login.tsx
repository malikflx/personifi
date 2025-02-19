import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  Container,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import standardRequest from "../../utils/standardRequest";
import Logo from "../Header/Logo";

const Login = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const checkEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsValidEmail(false);
    setError(null)
  }

  const validateEmail = async () => {
    try {
      const response = await standardRequest.post('/validate_email', { email });
      if (response.data.exists) {
        setIsValidEmail(true);
        setError(null);
      } else {
        setError("This email does not exist in our system. Please try again or sign up for an account.");
      }
    } catch (error) {
      console.error("Email check failed", error);
      setError("Something went wrong. Please try again.");
    }
  }
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await standardRequest.post('/login', { email, password });
      console.log("Login successful", response.data)
      navigate('/');
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid email or password");
    }
  };

  return (
    <Container>
      <Logo />
      <Stack sx={{ width: '100%', height: '100vh', marginTop: '6em'}} alignItems={'center'} display={'flex'} flexDirection={'column'}>
        <Typography variant="h5" gutterBottom sx={{fontWeight: '400'}}>{`Sign in to your account`}</Typography>

        {error && <Alert severity="error" sx={{ width: '30%'}}>{error}</Alert>}
        <Stack sx={{width: "100%"}} justifyContent={'center'} alignItems={'center'}>
            <Stack sx={{ width: '30%' }}>
              <form onSubmit={handleLogin}>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={checkEmail}
                  margin="normal"
                  required
                />

                {!isValidEmail && (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{paddingTop: 1, paddingBottom: 1, marginTop: 2}}
                    onClick={validateEmail}
                  >
                    {`Continue`}
                  </Button>
                )}

                {isValidEmail && (
                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    required
                  />
                )}

                {isValidEmail && (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    size="large"
                    sx={{paddingTop: 1, paddingBottom: 1, marginTop: 2}}>
                    {'Continue'}
                  </Button>
                )}
              </form>
            </Stack>
        </Stack>

      </Stack>
    </Container>
  );
};

export default Login;