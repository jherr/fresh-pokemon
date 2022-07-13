/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import { Pokemon } from "../utils/types.ts";
import AddToList from "../islands/AddToList.tsx";

export default function PokemonCard({
  pokemon,
  allowAdd,
}: {
  pokemon: Pokemon;
  allowAdd?: boolean;
}) {
  return (
    <div class={tw`rounded-xl border-1 p-5`}>
      <div class={tw`text-2xl font-bold mb-2`}>{pokemon.name}</div>
      <img
        src={`https://4he1myaw.directus.app/assets/${pokemon.image}?access_token=ba5da9ca-29e3-442b-ade2-be253c46302f`}
      />
      <div class={tw`mt-5 flex`}>
        <a class={tw`underline flex-grow`} href={`/pokemon/${pokemon.id}`}>
          View Details...
        </a>
        {allowAdd && (
          <div class={tw`flex-end`}>
            <AddToList pokemon={pokemon} />
          </div>
        )}
      </div>
    </div>
  );
}
