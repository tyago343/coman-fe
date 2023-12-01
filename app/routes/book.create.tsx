import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { getBaseURL } from "../api";
export async function action({
  request,
}: ActionFunctionArgs) {
  debugger
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
    <div>
      <h1>Create a new book</h1>
      <Form method="post">
        <label htmlFor="title" className="text-base block text-gray-300 translate[1.25rem, -2,5rem] duration-500 pointer-events-none">Title</label>
        <input
          type="text"
          name="title"
          className="px-5 border-black border-[1px] border-solid rounded-sm duration-[250ms] focus:outline-none focus:border-t-[rgba(0,0,0,0.1)]"
        />
        <label htmlFor="synopsis" className="text-base block text-gray-300 translate[1.25rem, -2,5rem] duration-500 pointer-events-none peer-focus:-translate-y-20">synopsis</label>
        <input
          type="text"
          name="synopsis"
          className="px-5 border-black border-[1px] border-solid rounded-sm duration-[250ms] focus:outline-none focus:border-t-[rgba(0,0,0,0.1)]"
        />
        <label htmlFor="publishedDate" className="text-base block text-gray-300 translate[1.25rem, -2,5rem] duration-500 pointer-events-none">release date</label>
        <input
          type="text"
          name="publishedDate"
          className="px-5 border-black border-[1px] border-solid rounded-sm duration-[250ms] focus:outline-none focus:border-t-[rgba(0,0,0,0.1)]"
        />
        <label htmlFor="price" className="text-base block text-gray-300 translate[1.25rem, -2,5rem] duration-500 pointer-events-none">price</label>
        <input
          type="text"
          name="price"
          className="px-5 border-black border-[1px] border-solid rounded-sm duration-[250ms] focus:outline-none focus:border-t-[rgba(0,0,0,0.1)]"
        />
        <label htmlFor="author" className="text-base block text-gray-300 translate[1.25rem, -2,5rem] duration-500 pointer-events-none">author</label>
        <input
          type="text"
          name="author"
          className="px-5 border-black border-[1px] border-solid rounded-sm duration-[250ms] focus:outline-none focus:border-t-[rgba(0,0,0,0.1)]"
        />
        <div>
          <button>Cancel</button>
          <button type="submit">Create</button>
        </div>
      </Form>
    </div>
  );
}
