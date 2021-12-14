import React, { useEffect } from 'react';
import Notes from './Notes';
import { useNavigate } from 'react-router';

export const MyNotes = props => {
  const navigate = useNavigate();
  useEffect(() => {
    // eslint-disable-next-line
    if (localStorage.getItem('auth-token')) {
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <br />
      <Notes showAlert={props.showAlert} />
    </div>
  );
};
