import {
  json,
  type MetaFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { getBaseURL } from "../api";
import { useLoaderData } from "@remix-run/react";
import Card from "../components/Card/Card";
import { useEffect, useState } from "react";
export const meta: MetaFunction = () => {
  return [
    { title: "Amazon - Bookshop" },
    { name: "description", content: "Welcome to this new amazon bookshop" },
  ];
};
export async function loader({ request }: LoaderFunctionArgs) {
  const books = await fetch(`${getBaseURL()}book`);
  const authors = await fetch(`${getBaseURL()}author`);
  return json({ books: await books.json(), authors: await authors.json() });
}

export default function Index() {
  const { books, authors } = useLoaderData<typeof loader>();
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books);
  useEffect(() => {
    if (selectedAuthor !== "") {
      const newFilteredBooks = books.filter(
        (book: any) => book.author.id === selectedAuthor
      );
      return setFilteredBooks(newFilteredBooks);
    }
    setFilteredBooks(books);
    return () => setFilteredBooks(books);
  }, [selectedAuthor, books]);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="text-center font-bold text-4xl underline text-white">
        Books
      </h1>
      <section></section>
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <button
          onClick={() => setSelectedAuthor("")}
          className={`mx-5 focus:ring-4 focus:outline-none text-base px-5 py-2.5 rounded-full dark:bg-gray-900 ${
            !selectedAuthor
              ? "text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700  focus:ring-blue-300 font-medium text-center mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 "
              : "text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900  dark:hover:border-gray-700 bg-white  focus:ring-gray-300  font-medium text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"
          }`}
        >
          All authors
        </button>
        {authors.map((author: any) => (
          <button
            key={author.id}
            type="button"
            onClick={() => setSelectedAuthor(author.id)}
            className={`mx-5 focus:ring-4 focus:outline-none text-base px-5 py-2.5 rounded-full dark:bg-gray-900 ${
              author.id === selectedAuthor
                ? "text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700  focus:ring-blue-300 font-medium text-center mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 "
                : "text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900  dark:hover:border-gray-700 bg-white  focus:ring-gray-300  font-medium text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"
            }`}
          >
            {author.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-auto">
        {filteredBooks?.map((book: any) => (
          <div key={book.id}>
            <Card book={book} />
          </div>
        ))}
      </div>
    </div>
  );
}
