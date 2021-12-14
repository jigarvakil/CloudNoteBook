import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import React, { useState } from 'react';
import NoteState from './context/notes/NotesState';
import { MyNotes } from './components/MyNotes';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import Alert from './components/Alert';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <hr />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<App />} />
              <Route exact index element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/mynotes"
                element={<MyNotes showAlert={showAlert} />}
              />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<SignUp showAlert={showAlert} />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
