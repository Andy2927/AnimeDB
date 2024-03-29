import { component$ } from '@builder.io/qwik';

export const Header = component$(() => {
    return (
        <header class="py-8 text-center backdrop-brightness-50 ">
        <h1 class="text-4xl font-bold  text-neutral-50" >
            AnimeDB
        </h1>
        <h2 class="text-3xl text-neutral-50">
            Gestión de animes
        </h2>
        </header>
    )
});