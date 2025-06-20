import { createEffect, createSignal, onCleanup } from "solid-js";

export default function useDebounce(delayMs: number) {
  const [search, setSearch] = createSignal<string>("");
  const [final, setFinal] = createSignal<string>("");

  createEffect(() => {
    const currentSearch = search(); // Create dependency to `search`
    const timerId = setTimeout(() => {
      setFinal(currentSearch);
    }, delayMs);

    onCleanup(() => {
      clearTimeout(timerId);
    });
  });

  return [final, setSearch] as const;
}
