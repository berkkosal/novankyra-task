import { Box, Button, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NetworkManager from '../services/NetworkManager';

export default function UserLogin({ tokens }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await NetworkManager.post("/token/", { email, password });
      console.log(response);
      tokens = response.data;
      console.log(tokens);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  const handleEnvironmentsClick = async (e) => {
    try {
      NetworkManager.defaults.headers.get['Content-Type'] = 'application/json';
      NetworkManager.defaults.headers.get['Accept'] = '*/*';
      NetworkManager.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
      NetworkManager.defaults.headers.get['Access-Control-Allow-Credentials'] = 'true';
      NetworkManager.defaults.headers.get['Access-Control-Allow-Methods'] = 'POST, PUT, PATCH, GET, DELETE, OPTIONS';
      NetworkManager.defaults.headers.get['Access-Control-Allow-Headers'] = 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization';
      NetworkManager.defaults.headers.get['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4NDUyMDI0LCJpYXQiOjE3MDg0NDg0MjQsImp0aSI6IjQ2ZjcwZGUwNTMxNzRkYTE5MzM3ODhkNTVkZGQxYzRkIiwidXNlcl9pZCI6MSwiaWRlbnRpdHkiOiI0YzM0ZjFmYi00ZjlkLTQ2NDItODE4ZC1lNjQ0YzE5MzNjZTQifQ.sUkmKOgChU3UQIfLbF2zALqTAB_7WZkF9kw_167-Ndk'
      
      const response = await NetworkManager.get("/v1/environments?org_id=1",);
      console.log(response);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  const handleTargetsClick = (e) => {

  }

  return (

    !isAuthenticated ?

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

      : <>
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
  );
}
