import { json } from "@remix-run/node";
import { getBaseURL } from "../api";
import { useLoaderData } from "@remix-run/react";
import Card from "../components/Card/Card";
import type { Author as IAuthor } from "../models/Author/author.interface";

export async function loader({ params }: { params: { id: string } }) {
  const author = await fetch(`${getBaseURL()}author/${params.id}`);
  return json(await author.json());
}

export default function Author() {
  const author: IAuthor = useLoaderData<typeof loader>();
  return (
    <main>
      <div className="text-white mb-5 max-w-xl mx-auto text-center">
        <h1 className="text-4xl font-bold">{author.name}</h1>
        <div className="my-5">
          <p>
            <span className="underline">Date of birth:</span>{" "}
            {author.dateOfBirth}
          </p>
          <p>
            <span className="underline">Place of birth:</span>{" "}
            {author.placeOfBirth}
          </p>
        </div>
      </div>
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4 m-auto">
        {author.books?.map((book) => (
          <div key={book.id}>
            <Card book={book} />
          </div>
        ))}
      </section>
    </main>
  );
}
