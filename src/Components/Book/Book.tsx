import type { FC } from "react";
import type { IBook } from "../../interfaces/bookInterfaces";
import css from "./book.module.css";

interface BookProps {
  item: IBook;
  onSelect: (id: string) => void;
}

export const Book: FC<BookProps> = ({ item, onSelect }) => {
  let { name, author, imgUrl, genre, rating } = item;

  return (
    <>
      <div className={css.Book}>
        <img
          src={imgUrl}
          alt={name}
          onError={(e) => {
            e.currentTarget.src =
              "https://www.flaggingdirect.com/images/No-Image-Placeholder.png";
          }}
          width={270}
        />
        <p className={css.Rating}>{rating}</p>
        <p className={css.Title}>{name}</p>
        <p className={css.Genre}>Genre: {genre}</p>
        <p className={css.Author}>{author}</p>
        <button onClick={() => onSelect(item.id)}>Next</button>
      </div>
    </>
  );
};
