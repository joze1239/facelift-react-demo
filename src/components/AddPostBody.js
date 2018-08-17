import React from 'react';

const AddPostBody = props => (
  <div className="form-group">
    <label >Body ({props.locale})</label>
    <textarea className="form-control"  rows="4" />
  </div>
);

export default AddPostBody;
