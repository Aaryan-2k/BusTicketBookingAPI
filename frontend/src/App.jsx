import { Routes,Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage';
import BusListPage from './pages/BusListPage';


function App() {
  return (
          <div>
            <Routes>
              <Route path='/' element={<BusListPage></BusListPage>} />
              <Route path='/about' element={<h1>About Page</h1>} />
              <Route path='/login' element={<LoginPage></LoginPage>} />
              <Route path='/register' element={<RegistrationPage></RegistrationPage>} />
            </Routes>
          </div>
  )
}
export default App
