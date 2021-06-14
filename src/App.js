import './App.scss';
import Auth from "./pages/auth/Auth";
import Home from "./pages/Home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path='/'>
            <Home />
          </Route>

          <Route exact path='/Sign'>
            <Auth />
          </Route>

        </Switch>

      </Router>
    </div>
  );
}

export default App;
