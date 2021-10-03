import { useEffect, useState } from "react";
import { fetchApi } from "../api";

export const PokemonCard = ({ url, name }) => {
  const [details, setDetails] = useState({});

  useEffect(async () => {
    const details = await fetchApi(url);
    setDetails(details);
  }, [url]);

  return (
    <div className="pokemon-card">
      <div>
        <figure>
          <img
            className="pokemon-image-thumb"
            src={details?.sprites?.other?.["official-artwork"]?.front_default}
            alt={"pokemon-" + name}
          />
        </figure>
        <div className="pokemon-details">
          <div>
            <label>Name: </label>
            {name}
          </div>
          <div>
            <label>Height:</label>
            {details.height}
          </div>
          <div>
            <label>Weight:</label>
            {details.weight}
          </div>
          <div>
            <label>Abilities:</label>
            {details.abilities?.map((ab, i, arr) => (
              <span key={ab.ability.name}>
                {ab.ability.name}
                {(i + 1) === arr.length ? "" : ", "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
