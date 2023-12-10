import { json, type ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { getBaseURL } from "../api";
import type { Author as IAuthor } from "../models/Author/author.interface";
import type { Book as IBook } from "../models/Book/book.interface";

export async function loader() {
  const authors = await fetch(`${getBaseURL()}author`);
  return json(await authors.json());
}
export async function action({ request }: ActionFunctionArgs) {
  const searchParams = new URLSearchParams();
  const formData = await request.formData();
  for (const [key, value] of formData.entries()) {
    searchParams.append(key, value.toString());
  }
  const data = await fetch(`${getBaseURL()}book/search?${searchParams}`);
  return json(await data.json());
}

export default function Search() {
  const authors: IAuthor[] = useLoaderData<typeof loader>();
  const books: IBook[] = useActionData<typeof action>();
  return (
    <div className="w-full max-w-6xl m-auto py-4">
      <h1 className="text-white text-center text-3xl mb-5">
        Advance search for books
      </h1>
      <Form
        method="POST"
        className="bg-white px-8 pt-6 pb-5 mb-4 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-200 m-auto"
      >
        <div className="mb-5 grid grid-cols-[1fr_1fr_100px] gap-4">
          <div className="">
            <label
              htmlFor="title"
              className="block text-gray-200 text-sm font-medium mb-2"
            >
              Title
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id="title"
                placeholder="Title"
                name="title"
                type="text"
                className="block w-full px-3 py-2 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="">
            <label
              htmlFor="publishedDate"
              className="block text-gray-200 text-sm font-medium mb-2"
            >
              Published Date
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id="publishedDate"
                placeholder="Published Date"
                name="publishedDate"
                type="text"
                className="block w-full px-3 py-2 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="">
            <label
              htmlFor="frontpage"
              className="block text-gray-200 text-sm font-medium mb-2"
            >
              Frontpage
            </label>
            <label className="relative inline-flex  items-center cursor-pointer">
              <input
                type="checkbox"
                id="frontpage"
                name="frontpage"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_1fr_100px] gap-4">
          <div className="mb-6">
            <label
              htmlFor="author"
              className="block text-gray-200 text-sm font-medium mb-2"
            >
              Author
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <select
                id="author"
                name="author"
                className="block w-full px-3 py-2 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select an author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="minPrice"
              className="block text-gray-200 text-sm font-medium mb-2"
            >
              Price
            </label>
            <div className="mt-1 rounded-md shadow-sm flex justify-between gap-4">
              <input
                id="minPrice"
                name="minPrice"
                placeholder="From"
                type="number"
                className="block w-full px-3 py-2 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <span className="flex items-center text-gray-200 text-sm font-medium mb-2">
                -
              </span>
              <input
                id="price"
                placeholder="To"
                name="maxPrice"
                type="number"
                className="block w-full px-3 py-2 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-200 text-slate-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create
            </button>
          </div>
        </div>
      </Form>

      <div>
        {books ? (
          <div className=" bg-white mb-4 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-200 m-auto overflow-hidden">
            {books.map((book, index) => (
              <Link
                to={`/book/${book.id}`}
                key={book.id}
                className={`group flex odd:bg-gray-800 even:bg-gray-600 hover:bg-slate-300 items-center justify-between rounded-lg px-4 `}
              >
                <div className="flex items-center py-2">
                  <div className="">
                    <div className="text-sm font-medium text-slate-100 group-hover:text-slate-800">
                      {book.title}
                    </div>
                    <div className="text-sm text-slate-300 group-hover:text-slate-800">
                      {book.author.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center ">
                  <div className="text-md text-slate-300 group-hover:text-slate-800">
                    {`Book price: € `}
                    <span className="font-bold">{book.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
