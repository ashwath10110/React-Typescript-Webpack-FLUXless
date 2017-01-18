import 'bootswatch/paper/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './main.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { Router, Route, Redirect, IndexRoute } from 'react-router';


export default class App extends React.Component<{}, {}> {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>Hello World!!</h1>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
