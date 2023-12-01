import { Form } from "@remix-run/react";

export default function BookCreate() {
  return (
    <div>
      <h1>Create a new book</h1>
      <Form action="post">
        <label htmlFor="title" className="text-base block text-gray-300 translate[1.25rem, -2,5rem] duration-500 pointer-events-none">Title</label>
        <input
          type="text"
          name="title"
          className="px-5 border-black border-[1px] border-solid rounded-sm duration-[250ms] focus:outline-none focus:border-t-[rgba(0,0,0,0.1)]"
        />
        <label htmlFor="sinopsys" className="text-base block text-gray-300 translate[1.25rem, -2,5rem] duration-500 pointer-events-none peer-focus:-translate-y-20">sinopsys</label>
        <input
          type="text"
          name="sinopsys"
          className="px-5 border-black border-[1px] border-solid rounded-sm duration-[250ms] focus:outline-none focus:border-t-[rgba(0,0,0,0.1)]"
        />
        <label htmlFor="releaseDate" className="text-base block text-gray-300 translate[1.25rem, -2,5rem] duration-500 pointer-events-none">Title</label>
        <input
          type="text"
          name="releaseDate"
          className="px-5 border-black border-[1px] border-solid rounded-sm duration-[250ms] focus:outline-none focus:border-t-[rgba(0,0,0,0.1)]"
        />
        <label htmlFor="price" className="text-base block text-gray-300 translate[1.25rem, -2,5rem] duration-500 pointer-events-none">Title</label>
        <input
          type="text"
          name="price"
          className="px-5 border-black border-[1px] border-solid rounded-sm duration-[250ms] focus:outline-none focus:border-t-[rgba(0,0,0,0.1)]"
        />
        <label htmlFor="author" className="text-base block text-gray-300 translate[1.25rem, -2,5rem] duration-500 pointer-events-none">Title</label>
        <input
          type="text"
          name="author"
          className="px-5 border-black border-[1px] border-solid rounded-sm duration-[250ms] focus:outline-none focus:border-t-[rgba(0,0,0,0.1)]"
        />
        <div>
          <button type="submit">Create</button>
          <button>Cancel</button>
        </div>
      </Form>
    </div>
  );
}
