import React, { useEffect, useState } from 'react'
import NetworkManager from '../services/NetworkManager';

export default function Dashboard() {

  let [selectedTargetId, setSelectedTargetId] = useState(null);
  const [targetDetail, setTargetDetail] = useState(false);

  const environmentData = [{
    id: '1',
    name: 'Conveyor north',
    description: 'Conveyor north',
    assigned_targets: ['1', '2', '3']
  }, {
    id: '2',
    name: 'Conveyor south',
    description: 'Conveyor south',
    assigned_targets: ['4', '5']
  }]

  const targetData = [{
    id: '1',
    name: 'sprite',
    description: 'Bottle of sprite',
  }, {
    id: '2',
    name: 'cola',
    description: 'Bottle of cola',
  }, {
    id: '3',
    name: 'fanta',
    description: 'Bottle of fanta',
  }, {
    id: '4',
    name: 'Box A',
    description: 'Box type A',
  }, {
    id: '5',
    name: 'Box B',
    description: 'Box type B',
  }]

  const handleClick = async (e) => {
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
          targetDetail false.
        </div>
      }

      <ul>
        {environmentData.map(environment =>
          <li key={environment.id}>
            <h1>Name: {environment.name}</h1>
            <h3>Description: {environment.description}</h3>
            <h4>Assigned Targets: {environment.assigned_targets.map(targetId =>
              <li key={targetId}>
                <p>Target Id: {targetId}</p>
                <button id={targetId} onClick={handleClick}>Detail</button>
              </li>
            )}
            </h4>

          </li>


        )}
      </ul>

    </>
  )
}
