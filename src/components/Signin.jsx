import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { getAuth, GoogleAuthProvider,signInWithPopup,signInWithEmailAndPassword } from 'firebase/auth';
// import { app } from '../firebase';
import GoogleIcon from '@mui/icons-material/Google'; 

const theme = createTheme();

export default function SignIn() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const handleGoogleSignUp = async () => {
    // signInWithPopup(auth, googleProvider);
    window.open(`${backendURL}/auth/google/callback`, "_self");
  }

  return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Box component="form"  noValidate sx={{ mt: 1 }}>
              {/* <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button> */}
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    sx={{ mt: 1, mb: 2 }}
                    startIcon={<GoogleIcon />}
                    onClick={handleGoogleSignUp}
                    
                  >
                    Sign in with Google
                  </Button>
                
              
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  {/* <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate('/signup')}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
  );
}
