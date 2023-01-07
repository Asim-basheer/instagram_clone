import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LeftNav from './components/LeftNav';
import { DarkModeContext } from './context/darkMoodContext';
// import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <BrowserRouter>
      <div className={`${darkMode ? 'dark' : 'light'}`}>
        <main className='background text'>
          <Routes>
            <Route path='' element={<LeftNav />} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
