import { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './index.css'
import { Navbar } from '../Navbar/Navbar'
import { HomePage } from '../Home/HomePage'
import { LoginPage } from '../Login/LoginPage'
import { RegisterPage } from '../Register/RegisterPage'
import { UserPage } from '../Userpage/UserPage'

class App extends Component {
  render = () => {
    return (
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/register' component={RegisterPage} />
            <Route exact path='/check' component={UserPage} />
          </Switch>
        </main>
      </Router>
    )
  }
}

export default App
