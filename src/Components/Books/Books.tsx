import type { FC } from "react";
import { Book } from "../Book/Book";
import type { IBook } from "../../interfaces/bookInterfaces";
import css from "./books.module.css";

interface BooksProps {
  books: IBook[];
  onSelect: (id: string) => void;
}

export const Books: FC<BooksProps> = ({ books, onSelect }) => {
  return (
    <>
      <div className={css.Books}>
        {books.map((book) => (
          <Book key={book.id} item={book} onSelect={onSelect} />
        ))}
      </div>
    </>
  );
};
