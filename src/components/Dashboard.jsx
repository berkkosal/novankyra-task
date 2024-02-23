import React, { useContext, useEffect, useState } from 'react'
import NetworkManager from '../services/NetworkManager';
import { Button } from '@mui/material';
import AuthContext from '../helper/AuthProvider';

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
    <>
      <h1>Environments</h1>
      <Button sx={{ mt: '2rem', mb: '2rem' }}
        onClick={handleEnvironmentsClick}
        variant="outlined">
        Get Environments
      </Button>
      <br />

      <ul>
        {environmentData.map(environment =>
          <li key={environment.id}>
            <h1>Name: {environment.name}</h1>
            <h3>Description: {environment.description}</h3>
            <h4>Assigned Targets: {environment.assigned_targets.map(targetId =>
              <li key={targetId}>
                <p>Target Id: {targetId}</p>
                <button id={targetId} onClick={handleTargetClick}>Detail</button>
              </li>
            )}
            </h4>
          </li>
        )}
      </ul>

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
    </>
  )
}
