import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { SeriesList } from "~/components/series-list";

export default component$(() => {
  return (
    <SeriesList/>
  );
});

export const head: DocumentHead = {
  title: "AnimeDB",
  meta: [
    {
      name: "description",
      content: "Gestion de Animes",
    },
  ],
};
