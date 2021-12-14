import React, { useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {}, [location]);
  const handleLogoutClick = () => {
    localStorage.removeItem('auth-token');
    navigate('/login');
  };
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="ms-icon-70x70.png"
            height="50"
            width="50"
            alt="navbar logo"
            style={{ marginBottom: '10px' }}
          />
          <strong className="mx-2">CloudNoteBook</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/' ? 'active' : ''
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li
              className={`nav-item ${
                !localStorage.getItem('auth-token') ? 'd-none' : ''
              }`}
            >
              <Link
                className={`nav-link ${
                  location.pathname === '/mynotes' ? 'active' : ''
                }`}
                aria-current="page"
                to="/mynotes"
              >
                My-Notes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/about' ? 'active' : ''
                }`}
                aria-current="page"
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('auth-token') ? (
            <div className="d-flex">
              <Link to="/login" className="mx-2 btn btn-outline-primary">
                Login
              </Link>
              <Link to="/signup" className="mx-2 btn btn-outline-danger">
                Sign Up
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogoutClick}
              className="mx-2 btn btn-outline-danger"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
