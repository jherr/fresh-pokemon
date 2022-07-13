/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import { Pokemon } from "../utils/types.ts";
import { DB, TOKEN } from "../utils/env.ts";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div class={tw`rounded-xl border-1 p-5`}>
      <div class={tw`text-2xl font-bold mb-2`}>{pokemon.name}</div>
      <img
        src={`https://${DB}.directus.app/assets/${pokemon.image}?access_token=${TOKEN}`}
      />
      <div class={tw`mt-5 flex`}>
        <a class={tw`underline flex-grow`} href={`/pokemon/${pokemon.id}`}>
          View Details...
        </a>
      </div>
    </div>
  );
}
