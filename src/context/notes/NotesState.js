import NoteContext from './noteContext';
import React, { useState } from 'react';

const NoteState = props => {
  const host = 'http://localhost:5000';
  let userNotes = [];
  const [notes, setNotes] = useState(userNotes);

  //get All Notes
  const getAllNotes = async () => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token'),
      },
    });
    const jsonData = await response.json();
    setNotes(jsonData);
  };
  //Add a Note
  const addNote = async (title, description, tag) => {
    //API CALL
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };
  // Delete a Note
  const deleteNote = async id => {
    //  API CALL
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token'),
      },
    });
    //const jsonData = response.json();
    //console.log(jsonData);
    //LOGIC to DELETE

    const newNotes = notes.filter(note => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  // Update a Note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // const jsonData = response.json();
    //LOGIC  to EDIT
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
