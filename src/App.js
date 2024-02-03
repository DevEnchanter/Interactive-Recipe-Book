import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage'; // Create this component
import ContactPage from './components/ContactPage'; // Create this component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
