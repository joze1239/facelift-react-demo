import React from 'react';

const AddPostTitle = props => (
  <div className="form-group row">
  <label className="col-2 col-form-label">Title ({props.locale})</label>
  <div className="col-10">
    <input className="form-control" type="text" />
  </div>
</div>
);

export default AddPostTitle;
