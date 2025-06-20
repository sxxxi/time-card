import SidebarNav from "./components/ui/SidebarNav";

export default function Layout({children}: any) {
  return <div class="bg-background text-foreground min-h-svh min-w-svw flex flex-row">
    <div class="grow">
      {children}
    </div>
    <SidebarNav />
  </div>
}
