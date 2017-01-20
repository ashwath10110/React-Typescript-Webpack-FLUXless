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
		this.state = { username: 'OffensivesWPS', password: '', tweets: [] };
		TweetStore.addChangeListener(GetDataFromServerTypes.GET_TWEETS, () => {

			this.setState({
				tweets: TweetStore.tweetsList
			});

			console.log(TweetStore.tweetsList);
		});
	}

	render() {
		return (
			<div className="container-fluid">
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
								<div className="card" key={item.id}>
									
									<img src={item.entities.media[0].media_url_https} alt="Avatar" className="img-card"></img>
									
									<div className="container">
										<h4><b>{item.user.screen_name}</b></h4>
									</div>
								</div>
							);
						})
					}
				</div>
			</div>
		);
	}
}

// <div className="panel panel-default" key={item.id}>
								// 	<div className="panel-heading">{item.created_at}</div>
								// 	<div className="panel-body">{item.text}</div>
								// </div>


								// <div className="col-md-3" key={item.id}>
					   //              <div className="card radius shadowDepth1">
						  //               <div className="card__content card__padding">
						  //                   <div className="card__meta">
						  //                       <a href="#">{item.created_at}</a>
						  //                   </div>
						  //                   <article className="card__article">
						  //                       <h2><div>Likes: {item.favorite_count}</div></h2>
						  //                       <p>{item.text}</p>
						  //                   </article>
						  //               </div>
						  //               <div className="card__action">                    
						  //                   <div className="card__author">
						  //                       <img src="{item.user.profile_image_url_https}" alt="user"></img>
						  //                       <div className="card__author-content">
						  //                           By <a href="#">{item.user.screen_name}</a>
						  //                       </div>
						  //                   </div>
						  //               </div>
					   //              </div>    
					   //          </div>