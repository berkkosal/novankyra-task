import Environments from './components/Dashboard.jsx'
import UserLogin from './components/UserLogin.jsx'
import AuthContext from './helper/AuthProvider.jsx'

function App() {

  return (
    <>
      <UserLogin />
      <Environments/>
    </>
  )
}

export default App;
