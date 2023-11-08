import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Heder from './components/commen/Heder';
import Userdata from './components/Userdata';
import { Routes,Route } from 'react-router-dom';
import Adduser from './components/commen/Adduser';
import Edituser from './components/Edituser';


function App() {
  return (
    <div className="App">
      <div className='leftpanel'>
      <Heder/>
      </div>
        <div className='rightpanel'>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Userdata' element={<Userdata/>}></Route>
          <Route path='/Adduser' element={<Adduser/>}></Route>
          <Route path='/Edituser/:id' element={<Edituser/>}></Route>
        </Routes>

      
      </div>
     
     
     
    </div>
  );
}

export default App;
