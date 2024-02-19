import { Box, Button, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import NetworkManager from '../services/NetworkManager';

export default function UserLogin({ tokens }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      const response = await NetworkManager.get("/v1/environments?org_id=1/")
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  const handleTargetsClick = (e) => {

  }

  return (
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
        <form style={{display:"flex", flexDirection:"column", justifyContent:"center"}}onSubmit={handleSubmit}>
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
            sx={{ mt: '2rem', bgcolor: "#5885AF",}}
            variant="contained"
            type="submit"
          >Submit
          </Button>
        </form>

        <Button sx={{mt:'2rem'}}
          onClick={handleEnvironmentsClick}
          variant="outlined">
          Get Environments
        </Button>

        <Button 
          sx={{mt:'2rem'}}
          onClick={handleTargetsClick}
          variant="outlined">
          Get Targets
        </Button>

      </Stack>


    </Box>
  );
}
