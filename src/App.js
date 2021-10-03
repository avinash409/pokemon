import "./App.css";
import { PokemonList } from "./containers/PokemonList";

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          {/* <SearchBar /> */}
        </nav>
      </header>
      <PokemonList />
    </div>
  );
}

export default App;
