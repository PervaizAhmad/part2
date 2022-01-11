import './App.css';
import Home from './components/Home/Home';
import Papers from './components/Papers/Papers';
import Authors from './components/Authors/Authors';
import ReadingList from './components/ReadingList/ReadingList';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <nav>
            <ul>
              <li><NavLink to="/" className={({ isActive }) => "link" + (isActive ? " active" : "")}>Home</NavLink></li>
              <li><NavLink to="papers" className={({ isActive }) => "link" + (isActive ? " active" : "")}>Papers</NavLink></li>
              <li><NavLink to="authors" className={({ isActive }) => "link" + (isActive ? " active" : "")}>Authors</NavLink></li>
              <li><NavLink to="reading_list" className={({ isActive }) => "link" + (isActive ? " active" : "")}>Reading List</NavLink></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="papers" element={<Papers />} />
            <Route path="authors" element={<Authors />} />
            <Route path="reading_list" element={<ReadingList />} />
            <Route path="*" element={<p>Not found</p>} />
          </Routes>
        </main>

        <footer>
          <div className="footerInfo">
            <section className="fSections">
              <h2>Location</h2>
              <p>Newcastle Upon Tyne</p>
            </section>
            <section className="fSections">
              <h2>University</h2>
              <p>Northumbria University</p>
            </section>
            <section className="fSections">
              <h2>Contact Email</h2>
              <p>pervaiz2.ahmad@northumbria.ac.uk</p>
            </section>
          </div>
          <hr />
          <div className="footerEndNote">
            <p>Designed by <span className='adjustHighlight'>:</span> Pervaiz Ahmad <span className='adjustHighlight'>|</span> w18014333</p>
            <p className='disclaimer'><span className='adjustHighlight'>Declaration:</span> This website is university coursework and not associated with or endorsed by the DIS conference.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
