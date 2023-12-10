import type { Author } from "../Author/author.interface";

export interface Book {
  id: number;
  title: string;
  synopsis: string;
  price: number;
  author: Author;
  publishedDate: string;
  frontPage: string;
}
