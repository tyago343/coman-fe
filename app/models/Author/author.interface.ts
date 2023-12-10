import type { Book } from "../Book/book.interface";

export interface Author {
  id: string;
  name: string;
  placeOfBirth: string;
  dateOfBirth: string;
  books: Book[];
}
