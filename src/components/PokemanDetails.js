import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { formatValue } from "../utils";

export const PokeMonDetails = () => {
  const history = useHistory();
  const { state } = useLocation();
  const details = state.details;

  const properties = Object.keys(details);
  const navigateHome = () => {
    history.push("/");
  };

  return (
    <div className="pokemon-details-full">
      <button onClick={navigateHome}>&lt; Go Back</button>
      <figure>
        <img
          className="pokemon-image"
          src={details?.sprites?.other?.["official-artwork"]?.front_default}
          alt={"pokemon-" + details.name}
        />
      </figure>
      {properties.map((prop) => (
        <div>
          <label>{prop}: </label>
          {formatValue(details[prop])}
        </div>
      ))}
    </div>
  );
};
