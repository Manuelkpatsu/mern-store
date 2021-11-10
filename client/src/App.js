import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store, { history } from './store';
import { SET_AUTH } from './screens/Authentication/constants';
import Application from './screens/Application';
import ScrollToTop from './components/ScrollToTop';
import setToken from './utils/token';

// Import application sass styles
import './styles/style.scss';

// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';

// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';

// react-bootstrap-table2 styles
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// rc-slider style
import 'rc-slider/assets/index.css';

// Authentication
const token = localStorage.getItem('token');

if (token) {
  // authenticate api authorization
  setToken(token);

  // authenticate routes
  store.dispatch({ type: SET_AUTH });
}

const App = () => {
    return (
      <Provider store={store}>
        <Router history={history}>
          <ScrollToTop>
            <Application />
          </ScrollToTop>
        </Router>
      </Provider>
    );
}

export default App;
