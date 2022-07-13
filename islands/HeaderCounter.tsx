/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import useList from "../utils/list.ts";

export default function HeaderCount() {
  const [list] = useList();
  return <p class={tw`font-bold text-3xl`}>{list.length}</p>;
}
