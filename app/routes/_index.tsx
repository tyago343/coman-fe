import { json, type MetaFunction } from "@remix-run/node";
import { getBaseURL } from "../api";
import { useLoaderData } from "@remix-run/react";
import Card from "../components/Card/Card";

export const meta: MetaFunction = () => {
  return [
    { title: "Amazon - Bookshop" },
    { name: "description", content: "Welcome to this new amazon bookshop" },
  ];
};
export async function loader() {
  const books = await fetch(`${getBaseURL()}book`);
  return json(await books.json());
}

export default function Index() {
  const books = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Books</h1>
      <section></section>
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <button
          type="button"
          className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
        >
          All categories
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((book: any) => (
          <Card book={book} key={book.id} />
        ))}
      </div>
    </div>
  );
}
