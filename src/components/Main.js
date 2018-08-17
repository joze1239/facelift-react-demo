import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import PostView from './PostView';
import AddPost from './AddPost';

class Main extends Component {

  render() {
    
    return (
      <main>
      <Switch>
        <Route exact path="/" render={(props) => <Home defaultLocale={this.props.defaultLocale} />} />
        <Route path="/post/:id" render={(props) => <PostView defaultLocale={this.props.defaultLocale} identifier = {props.match.params.id}  />} />
        <Route path="/add" render={(props) => <AddPost defaultLocale={this.props.defaultLocale} locales={this.props.locales}  />} />
     
      </Switch>
    </main>
    );
  }

}

export default Main;
