import * as React from 'react';
import * as request from 'superagent';

import { GetDataFromServerTypes } from '../../actions/types';
import * as Actions from '../../actions/tweetsActions';
import TweetStore from '../../stores/tweetsStore';

export default class Tweets extends React.Component<any, any> {

	constructor(props) {
		super(props);
	}

	handleGo(e) {

		e.preventDefault();

		this.setState({ tweets: [] });

		var toSend = {
			'username': this.state.username
		}

		Actions.getTweets(toSend);
	}

	handleUsername(e) {
		this.setState({ username: e.target.value });
	}

	handlePassword(e) {
		this.setState({ password: e.target.value });
	}

	componentWillMount() {
		this.state = { username: 'SrBachan', password: '', tweets: [] };
		TweetStore.addChangeListener(GetDataFromServerTypes.GET_TWEETS, () => {

			this.setState({
				tweets: TweetStore.tweetsList
			});
		});
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
				<br />
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