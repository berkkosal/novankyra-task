import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx'
import UserLogin from './components/UserLogin.jsx'
import RequireAuth from './components/RequireAuth.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path='login' element={<UserLogin />} />

        <Route element={<RequireAuth />}>
          <Route path='dashboard' element={<Dashboard />} />
        </Route>
        
      </Routes>
    </>
  )
}

export default App;
