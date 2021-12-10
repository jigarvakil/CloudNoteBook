import React from 'react';

const UserAlert = props => {
  return (
    <>
      <div style={{ height: '60px' }}>
        <div
          className={`alert alert-success alert-dismissible fade show`}
          role="alert"
        >
          <strong>Success</strong>: {props.msg}
        </div>
      </div>
    </>
  );
};

export default UserAlert;
