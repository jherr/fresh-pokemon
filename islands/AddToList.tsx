/** @jsx h */
import { h } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";

import { Pokemon } from "../utils/types.ts";
import useList from "../utils/list.ts";

export default function AddToList({ pokemon }: { pokemon: Pokemon }) {
  const [, add] = useList();

  return (
    <button
      class={tw`px-2 py-1 border(gray-100 1) hover:bg-gray-200`}
      onClick={() => add(pokemon)}
      disabled={!IS_BROWSER}
    >
      Add To List
    </button>
  );
}
