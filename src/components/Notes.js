import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import noteContext from '../context/notes/noteContext';
import { AddNote } from './AddNote';
import NoteItem from './NoteItem';

const Notes = props => {
  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;
  const navigate = useNavigate();
  const [note, setNote] = useState({
    id: '',
    etitle: '',
    edescription: '',
    etag: 'default',
  });
  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      getAllNotes();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refclose = useRef(null);
  const updateNote = currentNote => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const handleUpdateClick = e => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert('Note Updated successfully', 'success');
    refclose.current.click();
  };
  const handleOnchange = e => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={handleOnchange}
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={handleOnchange}
                    value={note.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={handleOnchange}
                    value={note.etag}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refclose}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleUpdateClick}
                  className="btn btn-primary"
                >
                  Update Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h4>Your Notes:</h4>
        <div className="container mx-2">
          {notes.length === 0 && 'No notes to display'}
        </div>
        {notes.map(note => {
          return (
            <NoteItem
              showAlert={props.showAlert}
              key={note._id}
              updateNote={updateNote}
              note={note}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
