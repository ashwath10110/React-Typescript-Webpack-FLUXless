import AppDispatcher from '../dispatchers/appDispatcher';

import { GetDataFromServerTypes } from '../actions/types';
import { BaseStore } from './baseStore';
import { AppEvent } from '../events/appEvent';

import * as request from 'superagent';

import { Tweet } from '../models/tweets';

class TweetsStore extends BaseStore<void> {

  tweetsList: '';

  callback: () => void;

  constructor(dispatcher: Flux.Dispatcher<AppEvent>) {

    super(dispatcher, (event: AppEvent) => {

      if (['tweets.getTweets'].indexOf(event.type) < 0) {
        return;
      }

      request
        .post('/getTweets')
        .send({ credentials: event.payLoad })
        .end(function(err, res) {

          var tweetsData = res.body;

          this.tweetsList = tweetsData;

          this._changeToken = event.type;

          this.emitChange();

        }.bind(this));

    }, () => {
      return this.tweetsList;
    });
  }
}

const TweetsStoreInstance = new TweetsStore(AppDispatcher);

export default TweetsStoreInstance;
