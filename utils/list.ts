import { Evt, StatefulEvt } from "evt";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState, useEffect } from "preact/hooks";

import { Pokemon } from "./types.ts";

const evtList = new StatefulEvt<Pokemon[]>([]);

if (IS_BROWSER) {
  evtList.post(JSON.parse(window.localStorage.getItem("list") ?? "[]"));

  evtList.attach((list) => {
    window.localStorage.setItem("list", JSON.stringify(list));
  });
}

export default function useList(): [Pokemon[], (pokemon: Pokemon) => void] {
  const [list, setList] = useState(evtList.state);
  useEffect(() => {
    const ctx = Evt.newCtx();
    evtList.attach(ctx, setList);
    return () => {
      evtList.detach(ctx);
    };
  }, []);

  return [
    list,
    (pokemon: Pokemon) => {
      console.log("Did add pokemon", pokemon);
      evtList.post([...list, pokemon]);
    },
  ];
}
