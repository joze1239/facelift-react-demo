import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddPostTitle from './AddPostTitle';
import AddPostBody from './AddPostBody';
import ImageUploader from 'react-images-upload';

class AddPost extends Component {
  constructor(props) {
    super(props);

    this.state = { picture: null };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      picture: picture
    });
    console.log(picture);
  }

  render() {
    const { locales } = this.props;
    return (
      <div className="container">
        <form>
          <h2>Post title</h2>
          {locales.map(locale => (
            <AddPostTitle key={locale} locale={locale} />
          ))}

          <h2>Post body</h2>
          {locales.map(locale => (
            <AddPostBody key={locale} locale={locale} />
          ))}

          <ImageUploader
            withIcon={true}
            buttonText="Choose images"
            onChange={this.onDrop}
            withPreview={true}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
          />
          <Link to="/add" className="btn btn-success btn-add-post">
            Add
          </Link>
        </form>
      </div>
    );
  }
}

export default AddPost;
