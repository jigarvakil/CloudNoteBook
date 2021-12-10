import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Modal from 'react-bootstrap/Modal';
export const AddNote = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState({
    title: '',
    description: '',
    tag: 'default',
  });
  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const handleSaveClick = e => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };
  const handleOnchange = e => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const context = useContext(noteContext);
  const { addNote } = context;
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div
              style={{ marginLeft: '80%' }}
              className="btn btn-primary"
              onClick={showModal}
            >
              <i className="fa fa-plus-square" aria-hidden="true"></i> Add Note
            </div>

            <Modal
              show={isOpen}
              onHide={hideModal}
              dialogClassName={'primaryModal'}
            >
              <form>
                <Modal.Header>
                  <Modal.Title>Hi</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      onChange={handleOnchange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      onChange={handleOnchange}
                    />
                  </div>
                </Modal.Body>

                <Modal.Footer>
                  <div className="btn btn-danger btn-small" onClick={hideModal}>
                    Cancel
                  </div>

                  <button
                    onClick={handleSaveClick}
                    type="submit"
                    className="btn btn-primary btn-small"
                  >
                    Save
                  </button>
                </Modal.Footer>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};
