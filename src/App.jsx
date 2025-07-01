import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './UserForm';
import './App.css'; 

function App() {
  return (
    <>
    <div className='root'>
    <Router>
      <Routes> 
        <Route path="/registerUser" element={<UserForm />} />
      </Routes>
    </Router>
    </div>
    </>
  );
}

export default App;