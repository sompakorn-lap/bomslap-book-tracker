import { BookType } from "../schema";

type BookListProps = {
  books: BookType[];
  onEdit: (data: BookType) => void;
  onDelete: (data: BookType) => void;
};

function BookList({
  books,
  onEdit,
  onDelete
}: BookListProps) {

  return (
    <section>
      {books.map((book) => (
        <div className="border rounded p-2 m-2" key={book.bookId}>
          <h1>{book.title}</h1>
          <h3>{book.author}</h3>
          <p>{book.description}</p>
          <button onClick={() => onEdit(book)}>edit</button>
          <button onClick={() => onDelete(book)}>delete</button>
        </div>
      ))}
    </section>
  );
}

export default BookList;