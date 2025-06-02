import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Header/Logo';
import standardRequest from '../../utils/standardRequest';
import {
  Alert,
  Button,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [isExistingEmail, setIsExistingEmail] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateEmail = async () => {
    try {
      const response = await standardRequest.post('/validate_email', { email });
      if (response.data.exists) {
        setError(
          'This email already exist in our system. Please try a different email.'
        );
      } else {
        setIsExistingEmail(true);
        setIsValidEmail(true);
        setError(null);
      }
    } catch (error) {
      console.error('Email check failed', error);
      setError('Something went wrong. Please try again.');
    }
  };

  const editEmail = () => {
    setIsExistingEmail(false);
    setIsValidEmail(false);
    setError(null);
    setPassword('');
    setPasswordConfirmation('');
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await standardRequest.post('/users', {
        user: { email, password, passwordConfirmation: passwordConfirmation },
      });

      console.log('Signup successful', response.data);
      setSuccess('Account created! Please log in...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Signup failed', error);
        const signupError = error as {
          response?: { data?: { errors?: string[] } };
        };
        setError(
          signupError.response?.data?.errors?.join(', ') ||
            'Something went wrong. Please try again.'
        );
      }
    }
  };

  return (
    <Container>
      <Logo />
      <Stack
        sx={{
          width: '100%',
          height: '100vh',
          marginTop: '6em',
        }}
        alignItems={'center'}
        display={'flex'}
        flexDirection={'column'}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: '400' }}>
          {`Sign up for an account`}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '30%' }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ width: '30%' }}>
            {success}
          </Alert>
        )}
        <Stack
          sx={{ width: '100%' }}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Stack sx={{ width: '30%' }}>
            <form onSubmit={handleSignup}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                fullWidth
                required
                slotProps={{
                  input: {
                    readOnly: isExistingEmail,
                    endAdornment: isExistingEmail ? (
                      <InputAdornment position="end">
                        <Typography
                          variant="body2"
                          color="primary"
                          component="button"
                          onClick={editEmail}
                          sx={{
                            color: 'primary',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            font: 'inherit',
                          }}
                        >
                          {`Edit`}
                        </Typography>
                      </InputAdornment>
                    ) : null,
                  },
                }}
              />

              {!isValidEmail && (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ paddingTop: 1, paddingBottom: 1, marginTop: 2 }}
                  onClick={validateEmail}
                >
                  {`Continue`}
                </Button>
              )}

              {isValidEmail && (
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  fullWidth
                  required
                />
              )}

              {isValidEmail && (
                <TextField
                  label="Password Confirmation"
                  variant="outlined"
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  margin="normal"
                  fullWidth
                  required
                />
              )}

              {isValidEmail && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ paddingTop: 1, paddingBottom: 1, marginTop: 2 }}
                >
                  {`Sign Up`}
                </Button>
              )}
            </form>
            <Stack justifyContent={'center'} alignItems={'center'}>
              <Typography variant="body2" gutterBottom sx={{ marginTop: 2 }}>
                {`Already have an account? `}
                <Link to="/login">{`Login`}</Link>
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Signup;
