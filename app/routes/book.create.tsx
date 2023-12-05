import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { getBaseURL } from "../api";
export async function action({ request }: ActionFunctionArgs) {
  debugger;
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries());
  const newBook = await fetch(`${getBaseURL()}book`, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await newBook.json();
  return redirect(`/book/${data.id}`);
}
export default function BookCreate() {
  return (
    <div className="w-full max-w-xs m-auto py-4 ">
      <h1 className="text-white text-center text-3xl mb-5">
        Create a new book
      </h1>
      <Form
        method="post"
        className="bg-white px-8 pt-6 pb-8 mb-4 max-w-sm border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-200 m-auto"
      >
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Title"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="synopsis"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Synopsis
          </label>
          <input
            type="text"
            name="synopsis"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Synopsis"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="publishedDate"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Release date
          </label>
          <input
            type="text"
            name="publishedDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Release date"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="price"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Price
          </label>
          <input
            type="text"
            placeholder="Price"
            name="price"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="author"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Author
          </label>
          <input
            type="text"
            name="author"
            placeholder="Author"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-red-500 hover:bg-red-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create
          </button>
        </div>
      </Form>
    </div>
  );
}
