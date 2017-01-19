import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';

import Login from './components/login/login';
import Home from './components/home/home';
import About from './components/about/about';
import browserHistory from './browserHistory';

export default class Main extends React.Component<any, any> {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-default">
					<div className="container-fluid">
						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav">
								<li><Link to="/" activeClassName="active">Home</Link></li>
								<li><Link to="/about" activeClassName="active">About</Link></li>
							</ul>
						</div>
					</div>
				</nav>
				<div className="container">
					{this.props.children}
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={Main}>
			<IndexRoute component={Home} />
			<Route path="/cars" component={Login} />
			<Route path="/about" component={About} />
		</Route>
	</Router>,
	document.getElementById('root')
);
