import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="papers">Papers</Link></li>
              <li><Link to="authors">Authors</Link></li>
              <li><Link to="reading_list">Reading List</Link></li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<p>Home</p>} />
          <Route path="papers" element={<p>Papers</p>} />
          <Route path="authors" element={<p>Authors</p>} />
          <Route path="reading_list" element={<p>Reading List</p>} />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
