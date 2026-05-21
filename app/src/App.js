import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ExperiencePage from './pages/ExperiencePage';

function App() {
  return (
    <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin' element={<Home isEditable={true} />} />
            <Route path='/admin/experience' element={<ExperiencePage />} />
          </Routes>
        </Layout>
    </Router>
  );
}

export default App;
