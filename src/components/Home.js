import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PostCard from './PostCard';
import PostAPI from '../api';

class Home extends Component {
  constructor(props) {
    super(props);

    window.onscroll = () => {
      const {
        loadPost,
        state: { error, isLoading, hasMore }
      } = this;

      if (error || isLoading || !hasMore) return;

      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadPost();
      }
    };
  }

  state = {
    error: false,
    hasMore: true,
    isLoading: false,
    posts: [],
    page: 1
  };

  componentWillMount() {
    this.loadPost();
  }

  loadPost = () => {
    const page = this.state.page;
    this.setState({ isLoading: true }, () => {
      PostAPI.list(page)
        .then(results => {
          const nextPost = results.map(post => ({
            posttitle: post.posttitle,
            postbody: post.postbody,
            postbannerUrl: post.postbanner.url,
            identifier: post.metaData.identifier
          }));

          this.setState({
            page: this.state.page + 1,
            hasMore: results.length > 0,
            isLoading: false,
            posts: [...this.state.posts, ...nextPost]
          });
        })
        .catch(err => {
          this.setState({
            error: err.message,
            isLoading: false,
            hasMore: false
          });
        });
    });
  };

  render() {
    const { error, isLoading, posts } = this.state;
    const { defaultLocale } = this.props;
    return (
      <div className="container">
        <Link to="/add" className="btn btn-success btn-add-post">
          Add post
        </Link>
        {posts.map(post => (
          <PostCard
            defaultLocale={this.props.defaultLocale}
            key={post.identifier}
            posttitle={
              defaultLocale
                ? post.posttitle.translatableContent[defaultLocale]
                : post.posttitle.getValue
            }
            postbody={
              defaultLocale
                ? post.postbody.translatableContent[defaultLocale]
                : post.postbody.getValue
            }
            postbannerUrl={post.postbannerUrl}
            identifier={'post/' + post.identifier}
          />
        ))}
        <hr />
        {error && <div style={{ color: '#900' }}>{error}</div>}
        {isLoading && <div>Loading...</div>}
      </div>
    );
  }
}

export default Home;
