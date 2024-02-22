import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx'
import UserLogin from './components/UserLogin.jsx'
import AuthContext from './helper/AuthProvider.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path='login' element={<UserLogin />} />
        <Route path='dashboard' element={<Dashboard/>} />
      </Routes>

    </>
  )
}

export default App;
