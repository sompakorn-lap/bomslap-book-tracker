import { useMemo, useState } from "react";
import BookList from "./components/BookList";
import { BookFormType } from "./schema";
import BookEditor from "./components/BookEditor";
import { useAddBook, useBooks, useDeleteBook, useEditBook } from "./service";

function BookPage() {

  const defaultBookValue = useMemo(() => ({
    bookId: "",
    title: "",
    author: "",
    description: ""
  }), []);

  const [selectedBook, setSelectedBook] = useState(defaultBookValue);

  const { data: books } = useBooks();
  const { mutate: editBook } = useEditBook();
  const { mutate: addBook } = useAddBook();
  const { mutate: deleteBook } = useDeleteBook();

  async function handleSave(data: BookFormType){
    const { bookId } = selectedBook;
    !bookId ? addBook(data) : editBook({ bookId, ...data });
  }

  if(!books)
    return <p>error</p>;
  
  return (
    <>
    <BookList 
      books={books}
      onEdit={setSelectedBook}
      onDelete={({ bookId }) => deleteBook(bookId)}
    />

    <BookEditor
      selectedBook={selectedBook}
      onSave={handleSave}
    />
    </>
  );
}

export default BookPage;