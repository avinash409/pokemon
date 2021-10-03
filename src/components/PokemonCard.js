import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchApi } from "../api";

export const PokemonCard = ({ url, name, searchCriteria }) => {
  const history = useHistory();
  const [details, setDetails] = useState({});
  const [isMatch, setIsMatch] = useState(true);

  useEffect(() => {
    async function getDetails() {
      const details = await fetchApi(url);
      setDetails(details);
    }
    getDetails();
  }, [url]);

  useEffect(() => {
    const isMatch =
      details?.name?.toLowerCase().includes(searchCriteria) ||
      details?.abilities?.some((ab) =>
        ab.ability.name.toLowerCase().includes(searchCriteria)
      );
    setIsMatch(isMatch);
  }, [searchCriteria, details]);

  const showDetails = () => {
    history.push('/details', {
      details
    })
  }

  if (!isMatch) return null;

  return (
    <div className="pokemon-card" onClick={showDetails}>
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
                {i + 1 === arr.length ? "" : ", "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
