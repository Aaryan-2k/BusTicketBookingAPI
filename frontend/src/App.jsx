import { Routes,Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage';
import BusListPage from './pages/BusListPage';
import PassengerInfoPage from './pages/PassengerInfoPage';


function App() {
  return (
          <div>
            <Routes>
              <Route path='/' element={<BusListPage></BusListPage>} />
              <Route path='/passengerinfo' element={<PassengerInfoPage></PassengerInfoPage>} />
              <Route path='/about' element={<h1>About Page</h1>} />
              <Route path='/login' element={<LoginPage></LoginPage>} />
              <Route path='/register' element={<RegistrationPage></RegistrationPage>} />
            </Routes>
          </div>
  )
}


export default App
