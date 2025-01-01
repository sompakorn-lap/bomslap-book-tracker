import { t } from "elysia";

const BookSchema = t.Object({
  title: t.String(),
  author: t.Optional(t.String()),
  description: t.Optional(t.String())
});

export default BookSchema;
export type BookType = typeof BookSchema.static;