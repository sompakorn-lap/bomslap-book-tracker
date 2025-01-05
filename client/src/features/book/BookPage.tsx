import { valibotResolver } from "@hookform/resolvers/valibot";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";

const BookSchema = v.object({
  title: v.pipe(
    v.string(),
    v.minLength(1, "title is required.")
  ),
  author: v.string(),
  description: v.string(),
});

type BookType = v.InferOutput<typeof BookSchema>;

function BookPage() {
  
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  async function getBooks() {
    const res = await axios.get("/api/book");
    setBooks(res.data);
  }

  async function addBook(data: BookType) {
    const res = await axios.post("/api/book", data);
  }

  async function editBook(bookId: string, data: BookType) {
    const res = await axios.put(`/api/book/${bookId}`, data);
  }

  async function deleteBook(bookId: string) {
    const res = await axios.delete(`/api/book/${bookId}`);
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookType>({
    resolver: valibotResolver(BookSchema)
  });

  async function onSave(data: BookType){
    if(selectedBookId)
      await editBook(selectedBookId, data);
    else 
      await addBook(data);
  }

  useEffect(() => {
    getBooks()
  }, []);

  useEffect(() => {
    if(!selectedBookId)
      return ;

    reset(books.filter(({ bookId }) => bookId === selectedBookId)[0]);
  }, [selectedBookId]);
  
  return (
    <>
    <section>
      {books.map(({ bookId, title, author, description }) => (
        <div className="border rounded p-2 m-2" key={bookId}>
          <h1>{title}</h1>
          <h3>{author}</h3>
          <p>{description}</p>
          <button onClick={() => setSelectedBookId(bookId)}>edit</button>
          <button onClick={() => deleteBook(bookId)}>delete</button>
        </div>
      ))}
    </section>

    <section>
      <form onSubmit={handleSubmit(onSave)}>
        <div>
          <label>title</label>
          <input type="text" {...register("title")} />
          <span>{errors.title?.message}</span>
        </div>
        <div>
          <label>author</label>
          <input type="text" {...register("author")} />
          <span>{errors.author?.message}</span>
        </div>
        <div>
          <label>description</label>
          <input type="text" {...register("description")} />
          <span>{errors.description?.message}</span>
        </div>
        <button type="submit">save</button>
      </form>
    </section>
    </>
  );
}

export default BookPage;