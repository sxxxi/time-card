import { A, AnchorProps } from "@solidjs/router";
import { JSX } from "solid-js";

export default function SidebarNav() {
  return (
    <nav class="bg-background text-foreground border-l border-l-muted h-svh w-96 p-4 shadow-md">
      <SidebarHeader />

      <div class="flex flex-col mt-4">
        <NavButton href="/dashboard">トップ</NavButton>
        <NavButton href="/time-card">勤怠入力</NavButton>
      </div>
    </nav>
  );
}

function SidebarHeader() {
  return (
    <div class="border border-muted text-slate-800 rounded-sm p-4">
      Hello
    </div>
  );
}

interface NavButtonProps extends AnchorProps {
  children: JSX.Element;
}

export function NavButton(props: NavButtonProps) {
  return (
    <A
      class="p-2 rounded-sm transition-colors ease-in-out"
      activeClass="bg-primary text-primary-fg"
      {...(props as AnchorProps)}
    >
      {props.children}
    </A>
  );
}
