import { createSignal, JSX } from "solid-js";

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  theme: "primary" | "secondary";
}

export default function Button(props: ButtonProps) {
  const { theme } = props;
  const [colorScheme, setColorScheme] = createSignal("");

  switch (theme) {
    case "primary":
      setColorScheme(`bg-primary text-primary-fg`);
      break;
    case "secondary":
      setColorScheme(`bg-background border-2 border-primary text-primary hover:text-primary-hover hover:border-primary-hover transition-color`);
      break;
  }

  return (
    <button
      {...props}
      type="button"
      class={`px-4 py-2 rounded-sm ${colorScheme()}`}
    >
      {props.children}
    </button>
  );
}
