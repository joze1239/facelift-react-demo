import React, { Component } from 'react';
import PostAPI from '../api';

class PostView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      identifier: props.identifier,
      posttitle: '',
      postbody: ''
    };
  }

  componentWillMount() {
    this.loadPost();
  }

  loadPost = () => {
    const { identifier } = this.state;
    PostAPI.get(identifier).then(post => {
      this.setState({
        posttitle: post.posttitle,
        postbody: post.postbody,
        postbannerUrl: post.postbanner.url
      });
    });
  };

  render() {
    const { defaultLocale } = this.props;
    const {posttitle, postbody} = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="mt-4">
              {defaultLocale && postbody
                ? posttitle.translatableContent[defaultLocale]
                : posttitle.getValue}
            </h1>
            <hr />
            <img
              className="img-fluid rounded postbanner-img"
              src={this.state.postbannerUrl}
              alt="Post"
            />
            <hr />
            <p className="postBody">
              {defaultLocale && postbody
                ? postbody.translatableContent[defaultLocale]
                : postbody.getValue}
            </p>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

export default PostView;
