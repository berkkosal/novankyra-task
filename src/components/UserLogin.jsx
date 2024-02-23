import { Box, Button, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NetworkManager from '../services/NetworkManager';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';


const LOGIN_URL = '/token/'

export default function UserLogin() {

  const { setAuth } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await NetworkManager.post(LOGIN_URL, { email, password });
      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;

      console.log('Access Token: ' + accessToken);
      console.log('Refresh Token: ' + refreshToken);

      setAuth({ email, password, accessToken, refreshToken });
      setSuccess(true);
      setEmail('');
      setPassword('');

    } catch (error) {
      if (!error?.response) {
        setErrMsg('No Server Response');
      } else if (error.response?.status === 400) {
        setErrMsg('Missing Email or Password');
      } else if (error.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
    }
    console.log(email, password);
  }

  return (
    <>
      {success ? (
        <>
          <h1>You are logged in.</h1>
          <Link to='/dashboard'>Go to Dashboard</Link>
        </>
      ) : (
        <Box display="flex" justifyContent="center" sx={{ minHeight: "100vh", bgcolor: "#41729F" }}>
          <Stack
            mt="3rem"
            justifyContent="center"
            alignItems="center"
            width="600px"
            height="600px"
            bgcolor="#C3E0E5"
            borderRadius="10%">
            <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            <h1>Sign In</h1>
            <form style={{ display: "flex", flexDirection: "column", justifyContent: "center" }} onSubmit={handleSubmit} noValidate autoComplete='off'>
              <Stack direction="row" sx={{ mt: '2rem' }} spacing={5}>
                <TextField
                  required
                  id="outlined-basic"
                  label="E-Mail"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  required
                  id="outlined-password-input"
                  label="Password"
                  variant="outlined"
                  type="password"
                  color='secondary'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </Stack>
              <Button
                sx={{ mt: '2rem', bgcolor: "#5885AF", }}
                variant="contained"
                type="submit"
              >Submit
              </Button>
            </form>
          </Stack>
        </Box>
      )}
    </>
  );
}
