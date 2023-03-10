import logo from './logo.svg';
import './App.css';
import FilterProducts from './pages/filterProducts';
import Login from './pages/Login';
import Header from './Layout/Header';
import AddDisease from './pages/AddDisease';
import bgImage from './assests/images/123.jpg'
function App() {
  return (
    <div style={{ backgroundImage:`url(${bgImage})`, backdropFilter:'blur(0.5)' , backgroundRepeat:'repeat', fontFamily: 'sans-serif' }}>
      <Header />
      <div className='my-2 text-center fw-light fs-2 text-secondary' style={{fontFamily:'monospace'}}>
        Add disease
      </div>
      <AddDisease />
    </div>
  );
}

export default App;
