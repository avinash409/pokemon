import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PokeMonDetails } from "./components/PokemanDetails";
import { PokemonList } from "./containers/PokemonList";
import { usePokemon } from "./hooks/usePokemon";
import { pokemonContext } from "./context/pokemonContext";

function App() {
  const pokemonState = usePokemon();
  return (
    <div className="App">
      <pokemonContext.Provider value={pokemonState}>
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
      </pokemonContext.Provider>
    </div>
  );
}

export default App;
