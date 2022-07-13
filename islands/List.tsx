/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import PokemonCard from "../src/PokemonCard.tsx";
import useList from "../utils/list.ts";

export default function List() {
  const [list] = useList();
  return (
    <div class={tw`grid sm:grid-cols-2 md:grid-cols-3 mt-5 gap-2`}>
      {list.map((pokemon) => (
        <PokemonCard pokemon={pokemon} key={pokemon.id} />
      ))}
    </div>
  );
}
