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
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiMTlkNjRhZmQ5NmI1MTNkNDM1MmY1In0sImlhdCI6MTYzOTA0MzI2Mn0.0pP8ktdwmKWRWbtrl8Fv2jAqZGLDOzyZOeri6q6_IiU',
      },
    });
    const jsonData = await response.json();
    setNotes(jsonData);
  };
  //Add a Note
  const addNote = async (title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiMTlkNjRhZmQ5NmI1MTNkNDM1MmY1In0sImlhdCI6MTYzOTA0MzI2Mn0.0pP8ktdwmKWRWbtrl8Fv2jAqZGLDOzyZOeri6q6_IiU',
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // const jsonData = response.json();
    // console.log('adding a note');
    const note = {
      _id: '61b3079d5b4320d7050b80d8as',
      user: '61b19d64afd96b513d4352f5',
      title: title,
      description: description,
      tag: tag,
      date: '2021-12-10T07:54:05.705Z',
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  // Delete a Note
  const deleteNote = async id => {
    //  API CALL

    //LOGIC to DELETE
    console.log('Deleting note with id:' + id);
    const newNotes = notes.filter(note => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  // Update a Note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiMTlkNjRhZmQ5NmI1MTNkNDM1MmY1In0sImlhdCI6MTYzOTA0MzI2Mn0.0pP8ktdwmKWRWbtrl8Fv2jAqZGLDOzyZOeri6q6_IiU',
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // const jsonData = response.json();
    //LOGIC  to EDIT
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
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
