import { createHistory } from 'history';
import { useRouterHistory } from 'react-router';

const browserHistory = useRouterHistory(createHistory)({
  basename: '/'
});

export default browserHistory;