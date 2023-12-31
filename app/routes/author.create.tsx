import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, useRouteError } from "@remix-run/react";
import { getBaseURL } from "../api";

export async function action({ request }: ActionFunctionArgs) {
  const cookies = request.headers.get("Cookie") || "";
  const cookiesArray = cookies.split(";");
  const tokenCookie = cookiesArray.find((cookie) =>
    cookie.includes("access_token")
  );
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries());
  try {
    const newAuthor = await fetch(`${getBaseURL()}author`, {
      method: "POST",
      body: JSON.stringify(body),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenCookie?.split("=")[1]}`,
      },
    });
    const data = await newAuthor.json();
    console.log("aca va la tada", data.statusCode);
    if (data.statusCode === 401) {
      return { message: "Cualquiera perro" };
    }
    return redirect(`/author/${data.id}`);
  } catch (e) {
    throw new Error("Oh no! Something went wrong!");
  }
}
export default function AuthorCreate() {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="w-full max-w-xs m-auto py-4 ">
      <h1 className="text-white text-center text-3xl mb-5">
        Create a new author
      </h1>
      <Form
        method="post"
        className="bg-white px-8 pt-6 pb-8 mb-4 max-w-sm border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-200 m-auto"
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Name"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="placeOfBirth"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Place of birth
          </label>
          <input
            type="text"
            name="placeOfBirth"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Place of birth"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="dateOfBirth"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Date of birth
          </label>
          <input
            type="text"
            name="dateOfBirth"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Date of birth"
          />
        </div>
        <div className="flex items-center justify-between mt-12">
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
