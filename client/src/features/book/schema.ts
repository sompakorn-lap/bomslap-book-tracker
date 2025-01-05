import * as v from "valibot";

const BookFormSchema = v.object({
  title: v.pipe(
    v.string(),
    v.minLength(1, "title is required.")
  ),
  author: v.string(),
  description: v.string(),
});

export default BookFormSchema;
export type BookFormType = v.InferOutput<typeof BookFormSchema>;
export type BookType = BookFormType & { bookId: string };