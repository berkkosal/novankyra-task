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
      <Stack>
        <Typography textAlign='center' variant='h2'>Environments</Typography>
        <Button sx={{ mt: '2rem', mb: '2rem', alignSelf: 'center' }}
          onClick={handleEnvironmentsClick}
          variant="outlined"
          startIcon={<FaDatabase />}>
          Get Environments
        </Button>
        <br />
      </Stack>

      <Stack display='flex' direction='row'>

        <Stack flex={2}>
          <List>
            {environmentData.map(environment =>
              <>
                <ListItem key={environment.id} alignItems='center'>
                  <Stack flex={2} alignItems='center'>
                    <Typography sx={{ mb: '2rem' }} variant='h4'>Name: {environment.name} </Typography>
                    <Typography variant='h5'>Description: {environment.description} </Typography>
                  </Stack>
                  <Stack display='flex' flex={3} justifyContent='center'>
                    <Stack>
                      <Typography variant='h5' textAlign='center'>Assigned Targets</Typography>
                    </Stack>
                    {environment.assigned_targets.map(targetId =>
                      <Stack>
                        <ListItem sx={{ justifyContent: 'center' }} key={targetId}>
                          <Stack>
                            <ListItemText>Target Id: {targetId}</ListItemText>
                          </Stack>
                          <Stack>
                            <ListItemButton
                              id={targetId}
                              onClick={handleTargetClick}
                              sx={{
                                fontSize: '12px',
                                color: '#C3E0E5'
                              }}
                            >Detail</ListItemButton>
                          </Stack>
                        </ListItem>
                      </Stack>
                    )}
                  </Stack>
                </ListItem>
                <hr />
              </>
            )}

          </List>
        </Stack>

        <Stack flex={1} justifyContent='center' alignItems='center'>
          <>
            {targetDetail
              ?
              <>
                <p>{'Target ID: ' + targetData[selectedTargetId - 1].id}</p>
                <p>{'Target Name: ' + targetData[selectedTargetId - 1].name}</p>
                <p>{'Target Description: ' + targetData[selectedTargetId - 1].description}</p>
              </>
              :
              <>
              </>
            }
          </>
        </Stack>

      </Stack>

    </Box>
  )
}
