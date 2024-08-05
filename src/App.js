
import './App.css';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import CustomerList from './components/CustomerList';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
   <Router>
    <div>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/customers" element={<CustomerList/>}/>
        <Route path="/admin" element={<AdminDashboard/>}/>

        
      </Routes>
    </div>
   </Router>
  );
}

export default App;
