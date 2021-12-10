import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import React from 'react';
import NoteState from './context/notes/NotesState';
import UserAlert from './components/UserAlert';

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <hr />
          <UserAlert msg="Hello" />
          <div className="container">
            <Routes>
              <Route path="/" element={<App />} />
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
