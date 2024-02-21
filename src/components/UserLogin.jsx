import { Box, Button, Stack, TextField } from '@mui/material'
import React, { useEffect, useState, useContext } from 'react'
import NetworkManager from '../services/NetworkManager';
import AuthContext from '../helper/AuthProvider';

const LOGIN_URL = '/token/'

export default function UserLogin({ }) {
  const { setAuth } = useContext(AuthContext);
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
      console.log('Access Token: ' + response.data.access);
      console.log('Refresh Token: ' + response.data.refresh);

      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;
      setAuth({ email, password, accessToken, refreshToken });
      setSuccess(true);

    } catch (error) {
      // Handle errors, need to add an error displayer to my code.

      // if (!error?.response) {
      //   setErrMsg('No Server Response');
      // } else if (error.response?.status === 400) {
      //   setErrMsg('Missing Email or Password');
      // } else if (error.response?.status === 401) {
      //   setErrMsg('Unauthorized');
      // } else {
      //   setErrMsg('Login Failed');
      // }

      console.log(`Error: ${error.message}`);
    }

    console.log(email, password);
    setEmail('');
    setPassword('');

  }

  
  const handleEnvironmentsClick = async (e) => {
    NetworkManager.defaults.headers.get['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4NDYxMDI0LCJpYXQiOjE3MDg0NTc0MjQsImp0aSI6IjU0MjcxNmY5OGIyNTQyNmNhNmRhOTY3NmM1MWQ5ZjA4IiwidXNlcl9pZCI6MSwiaWRlbnRpdHkiOiI0YzM0ZjFmYi00ZjlkLTQ2NDItODE4ZC1lNjQ0YzE5MzNjZTQifQ.jhXUq2M4GZAd4O66YGbFHNwlnlkTeeE3_bPnV6AIlCU'
    try {
      const response = await NetworkManager.get("/v1/environments?org_id=1",);
      console.log(response.data);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }

    console.log(tokens);

  }

  const handleTargetsClick = (e) => {

  }

  return (
    <>
      {success ? (
        <>
          <h1>You are logged in.</h1>
          <Button sx={{ mt: '2rem' }}
            onClick={handleEnvironmentsClick}
            variant="outlined">
            Get Environments
          </Button>

          <Button
            sx={{ mt: '2rem' }}
            onClick={handleTargetsClick}
            variant="outlined">
            Get Targets
          </Button>
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
