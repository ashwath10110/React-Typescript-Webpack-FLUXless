import * as React from 'react';
import * as request from 'superagent';

export default class Home extends React.Component<any, any> {

	constructor(props) {
		super(props);
	}

	handleGo(e) {

		e.preventDefault();

		var toSend = {
			'username': this.state.username
		}

		request
			.post('/getTweets')
			.send({ credentials: toSend })
			.end(function(err, res) {

				var tweetsData = res.body;

				this.setState({ tweets: tweetsData });

				console.log(tweetsData);

			}.bind(this));
	}

	handleUsername(e) {
		this.setState({ username: e.target.value });
	}

	handlePassword(e) {
		this.setState({ password: e.target.value });
	}

	componentWillMount() {
		this.state = { username: 'SrBachan', password: '', tweets: [] };
	}

	render() {
		return (
			<div className="container">
				<div className={"row"}>
					<form>
						<div className="form-group">
							<label htmlFor="username">Twitter User Handle</label>
							<input type="text" name="username" placeholder="Enter Twitter Userhandle" className="form-control" id="username" value={this.state.username} onChange={this.handleUsername.bind(this)} />
						</div>
						<button type="submit" className="btn btn-default" onClick={this.handleGo.bind(this)}>Get Tweets</button>
					</form>
				</div>
				<br/>
				<div className={"row"}>
					{
						this.state.tweets.map(function(item) {
							return (
								<div className="panel panel-default" key={item.id}>
									<div className="panel-heading">{item.created_at}</div>
									<div className="panel-body">{item.text}</div>
								</div>
							);
						})
					}
				</div>
			</div>
		);
	}
}