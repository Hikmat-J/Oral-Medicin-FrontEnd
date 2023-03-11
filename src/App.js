import logo from './logo.svg';
import './App.css';
import FilterProducts from './pages/filterProducts';
import Header from './Layout/Header';
import AddDisease from './pages/AddDisease';
import bgImage from './assests/images/123.jpg'
function App() {
  return (
    <div className='my-0 ' style={{ opacity:0.9, backgroundImage:`url(${bgImage})` , backgroundRepeat:'repeat', fontFamily: 'sans-serif' }}>
      <Header />
      <div className='my-2 text-center fw-light fs-2 text-secondary' style={{fontFamily:'monospace'}}>
        Add disease
      </div>
      <AddDisease />
    </div>
  );
}

export default App;
