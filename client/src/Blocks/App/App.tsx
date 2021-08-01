import { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './index.css'
import Navbar from './Navbar'
import loginPage from '../Login'
import homePage from '../Home'

class App extends Component {
  render = () => {
    return (
      <>
        <Navbar />
        <main>
          <Router>
            <Switch>
              <Route exact path='/' component={homePage} />
              <Route exact path='/login' component={loginPage} />
            </Switch>
          </Router>
        </main>
      </>
    )
  }
}

export default App
