import React, { useContext, useEffect, useState } from 'react'
import NetworkManager from '../services/NetworkManager';
import { Box, Button, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import AuthContext from '../helper/AuthProvider';
import { FaDatabase } from "react-icons/fa6";



export default function Dashboard() {

  const [selectedTargetId, setSelectedTargetId] = useState(null);
  const [targetDetail, setTargetDetail] = useState(false);
  const loggedInUser = useContext(AuthContext);
  const [environmentData, setEnvironmentData] = useState([]);
  const [targetData, setTargetData] = useState([]);


  const handleEnvironmentsClick = async (e) => {
    NetworkManager.defaults.headers.get['Authorization'] = `Bearer ${loggedInUser.auth.accessToken}`
    try {
      const response = await NetworkManager.get("/v1/environments?org_id=1");
      setEnvironmentData(response.data)
      fetchTargetDatas();
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  const fetchTargetDatas = async () => {
    NetworkManager.defaults.headers.get['Authorization'] = `Bearer ${loggedInUser.auth.accessToken}`
    try {
      const response = await NetworkManager.get("/v1/targets/?org_id=1")
      setTargetData(response.data);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  const handleTargetClick = async (e) => {
    const currentId = e.target.id - 1;
    setSelectedTargetId(targetData[currentId].id);
    setTargetDetail(true);
  }

  useEffect(() => {
    if (selectedTargetId != null) {
      console.log(selectedTargetId);
    }
  }, [selectedTargetId])

  return (
    <Box>
      <Typography textAlign='center' variant='h2'>Environments</Typography>
      <Button sx={{ mt: '2rem', mb: '2rem', alignSelf:'center'}}
        onClick={handleEnvironmentsClick}
        variant="outlined"
        startIcon={<FaDatabase/>}>
        Get Environments
        
      </Button>
      <br />

      <List>
        {environmentData.map(environment =>
          <ListItem key={environment.id}>
            <Stack>
              <Typography variant='h4'>Name: {environment.name} </Typography>
              <Typography variant='h5'>Description: {environment.description} </Typography>
            </Stack>
            <Stack>
              <Typography variant='h6'>Assigned Targets: {environment.assigned_targets.map(targetId =>
                <ListItem key={targetId}>
                  <ListItemText>Target Id: {targetId}</ListItemText>
                  <ListItemButton id={targetId} onClick={handleTargetClick}>Detail</ListItemButton>
                </ListItem>

              )}
              </Typography>
            </Stack>
          </ListItem>
        )}
      </List>

      {targetDetail
        ?
        <>
          <div>Returnün içindeki div</div>
          <p>{'Target ID:' + targetData[selectedTargetId - 1].id}</p>
          <p>{'Target Name:' + targetData[selectedTargetId - 1].name}</p>
          <p>{'Target Description:' + targetData[selectedTargetId - 1].description}</p>
        </>
        :
        <div>
          <br />
          targetDetail false.
        </div>
      }
    </Box>
  )
}
