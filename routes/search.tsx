/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import Header from "../src/Header.tsx";
import LiveSearch from "../islands/LiveSearch.tsx";

export default function Search() {
  return (
    <div class={tw`mx-auto max-w-screen-xl`}>
      <Header />
      <LiveSearch />
    </div>
  );
}
