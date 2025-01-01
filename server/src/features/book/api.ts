import Elysia, { t } from "elysia";
import BookSchema from "./schema";
import BookService from "./service";

const bookApi = new Elysia({ prefix: "/book" })
  .post("/", async ({ body }) => await BookService.add(body), {
    body: BookSchema
  })
  .get("/:bookId", async ({ params: { bookId } }) => await BookService.view(bookId))
  .get("/", async () => await BookService.viewList())
  .put("/:bookId", async ({ params: { bookId }, body }) => await BookService.edit(bookId, body), {
    body: t.Partial(BookSchema)
  })
  .delete("/:bookId", async ({ params: { bookId } }) => await BookService.delete(bookId))
  .put("/read/:bookId", async ({ params: { bookId } }) => await BookService.read(bookId))
;

export default bookApi;