import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import * as actions from '../../actions'

class Signout extends Component {
	componentWillMount() {
		this.props.signoutUser();
	}

	render() {
		return <div>See you again!</div>
	}
}

export default withRouter(connect(null, actions)(Signout));