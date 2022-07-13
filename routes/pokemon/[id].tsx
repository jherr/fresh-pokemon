/** @jsx h */
import { Handlers, PageProps } from "$fresh/server.ts";
import { h, Fragment } from "preact";
import { tw } from "@twind";

import { Pokemon } from "../../utils/types.ts";
import { DB, TOKEN } from "../../utils/env.ts";
import Header from "../../src/Header.tsx";

export const handler: Handlers<{
  pokemon: Pokemon;
}> = {
  async GET(_req, ctx) {
    const pokemon = await fetch(
      `https://${DB}.directus.app/items/pokemon/${ctx.params.id}?access_token=${TOKEN}`
    ).then((res) => res.json());
    if (!pokemon) {
      return new Response("Pokemon search failed", { status: 404 });
    }
    return ctx.render({ pokemon: pokemon.data });
  },
};

export default function Details(
  props: PageProps<{
    pokemon: Pokemon;
  }>
) {
  const pokemon = props.data.pokemon;
  return (
    <div class={tw`mx-auto max-w-screen-xl`}>
      <Header />
      <div class={tw`grid xs:grid-cols-1 md:grid-cols-2 gap-5`}>
        <img
          src={`https://${DB}.directus.app/assets/${pokemon.image}?access_token=${TOKEN}`}
          class={tw`w-full`}
        />
        <div>
          <div class={tw`text-5xl font-bold`}>{pokemon.name}</div>
          <div class={tw`text-3xl font-italic`}>
            {(pokemon.type ?? []).join(", ")}
          </div>
          <div class={tw`grid grid-cols-2 mt-5 text-3xl`}>
            {[
              "hp",
              "speed",
              "attack",
              "defense",
              "special_attack",
              "special_defense",
            ].map((stat) => (
              <Fragment key={stat}>
                <div class={tw`font-bold`}>{stat}</div>
                <div>{pokemon[stat as keyof Pokemon]}</div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
