import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ShoppiesState from "./context/omdb/ShoppiesState";
import Home from './components/pages/Home';
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    <ShoppiesState>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route  path="*" component={NotFound} />
        </Switch>
      </Router>
    </ShoppiesState>
  );
}

export default App;
