import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = props => (
  <div className="card mb-4">
    <img className="card-img-top" alt="Post" src={props.postbannerUrl} />
    <div className="card-body">
      <h2 className="card-title">{props.posttitle}</h2>
      <p className="card-text">
        {props.postbody.substring(0, 300)}
        ...
      </p>
      <Link to={props.identifier} className="btn btn-primary">
        Read More &rarr;
      </Link>
    </div>
  </div>
);

export default PostCard;
