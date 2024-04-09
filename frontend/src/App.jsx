import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import './App.css';
import { Root } from './components/Root/Root';
import Counter from './pages/Counter/Counter';
import Users from './pages/Users/Users';
import Register_Movies from './pages/Register_Movies/Register_Movies';

function App() {
  return (
    <Root>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="counter" element={<Counter />} />
        <Route path="users" element={<Users />} />
        <Route path="register_movie" element={<Register_Movies />} />
        <Route path="about" element={<About />} />
      </Routes>
    </Root>
  );
}

export default App;
