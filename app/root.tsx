import {
  json,
  redirect,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import styles from "app/tailwind.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
export async function loader({ request }: LoaderFunctionArgs) {
  const cookies = request.headers.get("Cookie") || "";
  const cookiesArray = cookies.split(";");
  const tokenCookie = cookiesArray.find((cookie) =>
    cookie.includes("access_token")
  );

  // if (!tokenCookie) {
  //   return redirect("/error");
  // }
  return json({});
}
export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-900">
        <Header />
        <Sidebar />
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <Outlet />
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
