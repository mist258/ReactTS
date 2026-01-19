import type { IBook } from "../../interfaces/bookInterfaces";
import type { FC } from "react";
import { useState } from "react";
import css from './booksDetail.module.css'

interface BookDetailsProps {
  book: IBook;
  onBack: () => void;
}

export const BookDetails: FC<BookDetailsProps> = ({book, onBack}) => {

     const [isRead, setIsRead] = useState(book.isRead);


    return (
        <div className={css.BookDetails}>
             <img src={book.imgUrl} alt={book.name} width={200} />
             <h2>{book.name}</h2>
             <p className={css.Author}>Author: {book.author}</p>
             <p className={css.Genre}>Genre: {book.genre}</p>
             <p className={css.Rating}>{book.rating}</p>
             <p className={css.Description}>{book.description}</p>

      <label>
        <input
          type="checkbox"
          checked={isRead}
          onChange={() => setIsRead(prev => !prev)}
        /> Read </label>
      <br />
      <button onClick={onBack}>Return to list</button>

        </div>
      
    )
}