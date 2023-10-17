import './App.css';
import AddFamilyMember from './Component/AddFamilyMember';
import Hero from './Component/Hero';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Hero />} />
          <Route path='/addnewmember' element={<AddFamilyMember />} />
        </Routes>
    </div>
  );
}

export default App;
