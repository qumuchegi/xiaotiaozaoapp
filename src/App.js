import React, { Component } from 'react';
import { Route,Switch } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import homepage from './pages/homepage/Homepage'
 
class App extends Component {
  render() {
    return (
      <div className="App">
          <Switch>
           <Route exact path='/' component={Login}></Route>
           <Route path='/register' component={Register}></Route>
           <Route path='/homepage/:user' component={homepage}></Route>
          </Switch>
      </div>
    );
  }
}

export default App;
