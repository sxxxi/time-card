import { A, AnchorProps } from "@solidjs/router";
import { JSX } from "solid-js";

export default function SidebarNav() {
  return (
    <nav class="bg-slate-100 text-slate-950 h-svh w-96 p-4">
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
    <div class="border border-slate-300 text-slate-800 rounded-sm p-4">
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
      activeClass="bg-slate-800 text-slate-50"
      {...(props as AnchorProps)}
    >
      {props.children}
    </A>
  );
}
