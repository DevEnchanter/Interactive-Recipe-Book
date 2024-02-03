import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import RecipeDetail from './components/RecipeDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe-detail" element={<RecipeDetail />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
