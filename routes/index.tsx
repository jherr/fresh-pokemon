/** @jsx h */
import { Handlers, PageProps } from "$fresh/server.ts";
import { h } from "preact";
import { tw } from "@twind";

import { Pokemon } from "../utils/types.ts";
import { DB, TOKEN } from "../utils/env.ts";
import PokemonCard from "../src/PokemonCard.tsx";
import Header from "../src/Header.tsx";

export const handler: Handlers<{
  pokemon: Pokemon[];
  query: string;
}> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    const filter = query.length
      ? `&filter[name][_contains]=${encodeURIComponent(query)}`
      : "";

    const pokemon = await fetch(
      `https://${DB}.directus.app/items/pokemon?access_token=${TOKEN}&limit=9${filter}`
    ).then((res) => res.json());
    if (!pokemon) {
      return new Response("Pokemon search failed", { status: 404 });
    }
    return ctx.render({ pokemon: pokemon.data, query });
  },
};

export default function Home(
  props: PageProps<{
    pokemon: Pokemon[];
    query: string;
  }>
) {
  const { pokemon, query } = props.data;

  return (
    <div class={tw`mx-auto max-w-screen-xl`}>
      <Header />
      <form class={tw`flex w-full gap-2`}>
        <input
          type="text"
          name="q"
          value={query}
          class={tw`flex-grow w-full shadow-sm focus:ring-indigo-800 focus:border-indigo-800 block sm:text-lg border-black-600 border-1 rounded-md p-3`}
        />
        <button
          type="submit"
          class={tw`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 px-10`}
        >
          Search
        </button>
      </form>

      <div class={tw`grid sm:grid-cols-2 md:grid-cols-3 mt-5 gap-2`}>
        {pokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
