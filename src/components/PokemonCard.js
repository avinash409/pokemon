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
            className="pokemon-image"
            src={details?.sprites?.other?.["official-artwork"]?.front_default}
            alt={"pokemon-" + name}
          />
          <figcaption>{name}</figcaption>
        </figure>
      </div>
    </div>
  );
};
