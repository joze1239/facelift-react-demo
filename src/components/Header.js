import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';


class Header extends Component {
  _onSelect = selected => {
    this.props.setLocale(selected.value);
  };

  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <li>
              <Link className="navbar-brand" to="/">
                Facelift - Blog demo
              </Link>
            </li>

            <div className="navbar-header pull-right nav-lang">
              <Dropdown
                options={this.props.locales}
                onChange={this._onSelect}
                value={this.props.defaultLocale}
                placeholder=""
              />
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
