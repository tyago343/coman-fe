import { json } from "@remix-run/node";
import { getBaseURL } from "../api";
import type { Book as IBook } from "../models/Book/book.interface";
import { Link, useLoaderData } from "@remix-run/react";

export async function loader({ params }: { params: { id: string } }) {
  const book = await fetch(`${getBaseURL()}book/${params.id}`);
  return json(await book.json());
}
export default function Book() {
  const book: IBook = useLoaderData<typeof loader>();
  return (
    <main className="max-w-screen-lg m-auto text-white relative">
      <div className="flex flex-row">
        <img
          className="w-2/3"
          src={
            book.frontPage ||
            "https://grupoalmuzara.com/libro/9788417044763_portada.jpg"
          }
          alt={`${book.title} cover`}
        />
        <div className="ml-10 ">
          <h1 className="font-extrabold text-5xl mb-6">{book.title}</h1>
          <p className="my-4">{book.synopsis}</p>
          <div className="float-right mt-5">
            <p>
              <span>Best price</span>
              <span> €{book.price}</span>
            </p>
            <p>
              <span>Published Date: </span>
              {book.publishedDate}
            </p>
          </div>
          <div className="absolute bottom-0 right-0">
            <p>
              Author:{" "}
              <Link
                to={`/author/${book.author.id}`}
                className="inline-flex items-center text-blue-400 hover:underline cursor-pointer"
              >
                {book.author.name}{" "}
                <svg
                  className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                  />
                </svg>
              </Link>
            </p>
            <p>Place of birth: {book.author.placeOfBirth}</p>
            <p>Date of birth: {book.author.dateOfBirth}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
