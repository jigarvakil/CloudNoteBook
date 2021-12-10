import React, { useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  let location = useLocation();
  useEffect(() => {}, [location]);

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
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
