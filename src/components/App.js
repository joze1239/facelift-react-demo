import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import PostAPI from '../api';

class App extends Component {
  state = {
    defaultLocale: '',
    locales: ['']
  };

  componentWillMount() {
    this.getLocales();
  }

  getLocales = () => {
    PostAPI.getLocales().then(data => {
      this.setState({
        defaultLocale: data.defaultLocale,
        locales: data.locales
      });
    });
  };

  setLocale = locale => {
    this.setState({
      defaultLocale: locale,
    });
  };

  render() {
    return (
      <div>
        <Header
          setLocale={this.setLocale}
          defaultLocale={this.state.defaultLocale}
          locales={this.state.locales}
        />
        <Main {...this.state}  />
      </div>
    );
  }
}

export default App;
