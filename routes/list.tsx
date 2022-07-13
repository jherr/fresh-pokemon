/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import Header from "../src/Header.tsx";
import ListIsland from "../islands/List.tsx";

export default function List() {
  return (
    <div class={tw`mx-auto max-w-screen-xl`}>
      <Header />
      <ListIsland />
    </div>
  );
}
