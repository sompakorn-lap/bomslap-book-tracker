import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import BookFormSchema, { BookFormType, BookType } from "../schema";
import { useEffect } from "react";

type BookEditorProps = {
  selectedBook: BookType;
  onSave: (data: BookFormType) => void;
};

function BookEditor({
  selectedBook,
  onSave,
}: BookEditorProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<BookFormType>({
    resolver: valibotResolver(BookFormSchema)
  });

  useEffect(() => {
    reset(selectedBook);
  }, [selectedBook]);

  return (
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
  );
}

export default BookEditor;