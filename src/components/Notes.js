import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import { AddNote } from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getAllNotes } = context;
  useEffect(() => {
    getAllNotes();
  }, []);
  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h4>Your Notes:</h4>
        {notes.map(note => {
          return <NoteItem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
