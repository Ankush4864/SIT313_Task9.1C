import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavFooter from './NavFooter';
import Login from './Login';
import Signup from './Signup';

function App() {
  return (

    <Routes>
      <Route path='/' element={<NavFooter />} >
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      </Route>
    </Routes>

  );
}

export default App;
