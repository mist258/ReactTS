import { useState, useEffect } from "react"
import type { IBook } from "../../interfaces/bookInterfaces"
import { Books } from "../Books/Books"
import { listOfBooks} from "../../Data/BooksData"
import { BookDetails } from "../BooksDetail/BookDetails"
import css from './booskApp.module.css'

type NewBook = Omit<IBook, "id">;


export const BooksApp = () => {

    const [books, setBooks] = useState<IBook[]>(listOfBooks)
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null)
    const [filter, setFilter] = useState("")
    const [newBook, setNewBook] = useState<NewBook>({
    name: "",
    author: "",
    genre: "",
    rating: 0,
    description: "",
    imgUrl: "",
    isRead: false,
  });


    // component mounted
    useEffect(() => {
        console.log("BooksApp mounted");
    }, [])

    // component updated 
    useEffect(() => {
        console.log("BooksApp changed");
    }, [books, filter, selectedBookId])

    const getNextId = (): string => {
        return books.length > 0
        ? (Math.max(...books.map(b => Number(b.id))) + 1).toString(): "1";
    };

    const filteredBooks = books.filter(
        book => book.id.includes(filter) ||
        book.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
        book.author.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );

    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setNewBook(prev => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
    };

    const addBook = () => {
    if (!newBook.name || !newBook.author) return;

    const book: IBook = {
      ...newBook,
      id: getNextId(),
    };

    setBooks(prev => [...prev, book]);

    setNewBook({
      name: "",
      author: "",
      genre: "",
      rating: 0,
      description: "",
      imgUrl: "",
      isRead: false,
    });
  };

    return (

       <div className={css.BookForm}>

        
            {
            selectedBookId === null ? (
            <>
                <div className={css.FilterForm}>
                <input
                    type="text"
                    placeholder="Filter by id, name, author"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                />
                </div>
                <div className={css.FormWrap}>
                <input
                    name="name"
                    placeholder="Name"
                    value={newBook.name}
                    onChange={handleChange}
                />

                <input
                    name="author"
                    placeholder="Author"
                    value={newBook.author}
                    onChange={handleChange}
                />

                <input
                    name="genre"
                    placeholder="Genre"
                    value={newBook.genre}
                    onChange={handleChange}
                />

                <input
                    name="rating"
                    placeholder="Rating"
                    type="number"
                    value={newBook.rating || ""}
                    onChange={handleChange}
                    style={{ appearance: "textfield" }}
                />
                <input
                    name="imgUrl"
                    placeholder="Image URL"
                    value={newBook.imgUrl}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={newBook.description}
                    onChange={handleChange}
                />
                </div>

                <div className={css.ButtonWrap}>
                <button onClick={addBook}>Add book to list</button>
                </div>

                <div className={css.BooksWraper}>
                <Books
                    books={filteredBooks}
                    onSelect={setSelectedBookId}
                />
                </div>
            </>

        ) : (
            <div className={css.BooksDetailWraper}>
                <BookDetails
                book={books.find(b => b.id === selectedBookId)!}
                onBack={() => setSelectedBookId(null)}
                />
            </div>
        )   
       } 
        </div>
    )
}