import React, {Component} from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';

import Login from './pages/login';
import Main from './pages/main';


class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Route path="/login" component={Login}/>
          <Route path="/main" component={Main}/>
        </HashRouter>
      </div>
    )
  }
}

export default App;