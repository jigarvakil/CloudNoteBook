import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = props => {
  const { note } = props;
  const vrColor = 'gray';
  const handleDeleteClick = () => {
    console.log('clicked');
  };
  const context = useContext(noteContext);
  const { deleteNote } = context;
  return (
    <>
      <div className="col-md-4">
        <div className="card my-3">
          <div className="card-header">
            <h4
              style={{
                borderLeft: `3px solid ${vrColor}`,
                height: 'auto',
              }}
              className="card-title"
            >
              <span style={{ marginLeft: '10px' }}>{note.title}</span>
            </h4>

            <h6 className="card-subtitle mb-2 my-3 text-muted">
              <span className="badge bg-info text-dark">{note.tag}</span>
            </h6>
          </div>

          <div className="card-body">
            <p className="card-text">{note.description}</p>
          </div>
          <div className="card-footer d-flex flex-row-reverse">
            <div onClick={handleDeleteClick} className="btn btn-primary">
              <i className="fa fa-edit"></i>
            </div>
            <div
              onClick={() => {
                deleteNote(note._id);
              }}
              className="mx-2 btn btn-danger"
            >
              <i className="fa fa-trash-o" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
