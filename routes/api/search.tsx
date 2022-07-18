import { HandlerContext } from "$fresh/server.ts";

import { Pokemon } from "../../utils/types.ts";
import { DB, TOKEN } from "../../utils/env.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  const url = new URL(req.url);
  const query = url.searchParams.get("q") || "";
  const filter = query.length
    ? `&filter[name][_contains]=${encodeURIComponent(query)}`
    : "";
  const pokemon = await fetch(
    `https://${DB}.directus.app/items/pokemon?access_token=${TOKEN}&limit=9${filter}`
  ).then((res) => res.json());

  return new Response(
    JSON.stringify(
      pokemon.data.map((p: Pokemon) => ({
        ...p,
        image: `https://${DB}.directus.app/assets/${p.image}?access_token=${TOKEN}`,
      }))
    )
  );
};
