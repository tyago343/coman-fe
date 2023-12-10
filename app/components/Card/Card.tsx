import { Link } from "@remix-run/react";
import type { Book } from "../../models/Book/book.interface";

export default function Card({ book }: { book: Book }) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-auto flex flex-col">
      <Link to={`book/${book.id}`}>
        <img
          className="rounded-t-lg h-80 m-auto mt-3"
          src="https://grupoalmuzara.com/libro/9788417044763_portada.jpg"
          alt="Book cover"
        />
      </Link>
      <div className="p-5 flex-grow">
        <Link to={`book/${book.id}`}>
          <h5 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white underline underline-offset-8">
            {book.title}
          </h5>
        </Link>
        <p className="mb-3 text-md font-normal text-gray-700 dark:text-gray-400 line-clamp-5">
          {book.synopsis}
        </p>
        {book.author ? (
          <div className="mb-4">
            <Link
              to={`author/${book.author?.id}`}
              className="inline-flex items-center text-blue-400 hover:underline"
            >
              {book.author?.name}
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
          </div>
        ) : null}

        <Link
          to={`/book/${book.id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
