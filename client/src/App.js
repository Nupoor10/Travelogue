import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import NewNote from './pages/NewNote';
import SingleNote from './pages/SingleNote'
import EditNote from './pages/EditNote';


function App() {
  return (
    <div className='App'>
      <Router>
          <Navbar />
          <Routes>
            <Route exact path = "/" element={<Login />}></Route>
            <Route exact path = "/home" element={<Home />}></Route>
            <Route exact path = "/register" element={<Register />}></Route>
            <Route exact path = "/new" element={<NewNote />}></Route>
            <Route exact path = "/single/:id" element={<SingleNote />}></Route>
            <Route exact path = "/edit/:id" element={<EditNote />}></Route>
          </Routes>
          <Footer />
      </Router>
    </div>
  );
}

export default App;
