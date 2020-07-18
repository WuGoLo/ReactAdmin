import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from '@/pages/App'
import Admin from '@/layout/admin'
import Home from '@/pages/home'
import NoMatch from '@/pages/Nomatch'

import Login from '@/pages/Login'
import Register from '@/pages/Register';

class Router extends Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/admin" render={() => (
              <Admin>
                
              </Admin>
            )} />
            <Route path="/home" render={() => (
              <Admin>
                <Route path="/home" component={Home}></Route>
              </Admin>
            )} />
            <Route component={NoMatch} />
          </Switch>
        </App>
      </HashRouter>
    )
  }
}

export default Router