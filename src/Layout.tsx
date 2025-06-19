import SidebarNav from "./components/ui/SidebarNav";

export default function Layout({children}: any) {
  return <div class="bg-slate-950 text-slate-50 min-h-svh min-w-svw flex flex-row">
    <SidebarNav />
    {children}
  </div>
}
