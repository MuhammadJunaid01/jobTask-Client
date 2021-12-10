import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./Components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./Components/navigation/Navigation";
import Home from "./Components/home/Home";
import Login from "./Components/login/Login";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
