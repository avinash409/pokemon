import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PokeMonDetails } from "./components/PokemanDetails";
import { PokemonList } from "./containers/PokemonList";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/details">
            <PokeMonDetails />
          </Route>
          <Route path="/">
            <PokemonList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
