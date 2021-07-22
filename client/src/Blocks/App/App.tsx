import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import loginPage from "../Login";
import homePage from "../Home";
import Container from "@material-ui/core/Container";

class App extends Component {
  render = () => {
    return (
      <Container>
        <Router>
          <Switch>
            <Route exact path="/" component={homePage} />
            <Route exact path="/login" component={loginPage} />
          </Switch>
        </Router>
      </Container>
    );
  };
}

export default App;
