/** @jsx h */
import { h, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import { tw } from "@twind";

import PokemonCard from "../src/PokemonCard.tsx";
import { Pokemon } from "../utils/types.ts";

export default function LiveSearch() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
      });
  }, [query]);

  return (
    <Fragment>
      <form class={tw`w-full`}>
        <input
          type="text"
          name="q"
          value={query}
          onKeyUp={(e) => setQuery(e.currentTarget.value)}
          class={tw`w-full shadow-sm focus:ring-indigo-800 focus:border-indigo-800 block sm:text-lg border-black-600 border-1 rounded-md p-3`}
        />
      </form>

      <div class={tw`grid sm:grid-cols-2 md:grid-cols-3 mt-5 gap-2`}>
        {pokemon.map((pokemon) => (
          <PokemonCard pokemon={pokemon} allowAdd key={pokemon.id} />
        ))}
      </div>
    </Fragment>
  );
}
