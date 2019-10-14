import React, {Component} from 'react';
import { HashRouter, Route ,Redirect} from 'react-router-dom';
import { Provider } from 'react-redux';

import Login from './pages/login';
import Main from './pages/main';

import store from './store';


class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <HashRouter>
            <Route exact path="/login" component={Login}/>
            <Route  path="/main" component={Main}/>
            <Redirect exact from='/' to='/login' />
          </HashRouter>
        </Provider>
    )
  }
}

export default App;