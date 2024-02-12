import stylesheet from "~/css/main.css";
import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import MainNavigation from "./components/MainNavigation";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
export function ErrorBoundary() {
  const error = useRouteError() as Error;

  if (isRouteErrorResponse(error)) {
    return (
      <html>
        <head>
          <title>Oh no!</title>
          <Meta />
          <Links />
        </head>
        <title>{error.statusText}</title>
        <body>
          <header>
            <MainNavigation />
          </header>
          <main className="error">
            <h1>{error.statusText}</h1>
            <p>{error.data.message}</p>
            <p>Back to <Link to="/">safety</Link>!</p>
          </main>

          <Scripts />
        </body>
      </html>
    )
  }
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>An error accurred!</h1>
          <p>{error.message}</p>
          <p>Back to <Link to="/">safety</Link>!</p>
        </main>

        <Scripts />
      </body>
    </html>
  );
}
