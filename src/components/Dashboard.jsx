import React, { useEffect, useState } from 'react'

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

  const handleClick = (e) => {
    console.log(e.target);
    console.log(e.target.id);
    setSelectedTargetId = (e.target.id);
    console.log(selectedTargetId);
    targetDetail ? setTargetDetail(false) : setTargetDetail(true);
  }

  // useEffect(() => {
  //   console.log(targetDetail);
  // }, [targetDetail])

  useEffect(()=>{
    setSelectedTargetId(e.target.id)
  }, [selectedTargetId])

  return (
    <>
      <h1>Environments</h1>
      {targetDetail
        ?
        <>
          <div>Returnün içindeki div</div>
          <p>{'Target ID:' + targetData[1].id}</p>
          <p>{'Target Name:' + targetData[1].name}</p>
          <p>{'Target Description:' + targetData[1].description}</p>

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
