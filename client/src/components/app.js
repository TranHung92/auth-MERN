import React, { Component } from 'react';

import Header from './header';

export default class App extends Component {
  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
				<Header />
				{this.props.children}
      </div>
    );
  }
}
