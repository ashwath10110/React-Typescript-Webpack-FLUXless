import { GetDataFromServerTypes } from './types';

import { AppEvent } from '../events/appEvent';
import AppDispatcher from '../dispatchers/appDispatcher';

export function getTweets(payload: any) {
	AppDispatcher.dispatch(new AppEvent(GetDataFromServerTypes.GET_TWEETS, payload));
}