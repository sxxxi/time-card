/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import { children, lazy } from "solid-js";
import Layout from "./Layout";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

const routes = [
  {
    path: "/dashboard",
    component: lazy(() => import("./routes/Home")),
    children: [],
  },
  {
    path: "/time-card",
    component: lazy(() => import("./routes/TimeCard")),
    children: [],
  },
  {
    path: "*404",
    component: lazy(() => import("./routes/NotFound")),
  }
];

render(() => <Router root={Layout}>{routes}</Router>, root!);
