import * as React from 'react';
import * as request from 'superagent';

import Tweets from './../components/tweets/tweets';

export default class Home extends React.Component<any, any> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Tweets></Tweets>
    );
  }
}