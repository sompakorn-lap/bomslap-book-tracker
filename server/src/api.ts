import Elysia from "elysia";
import bookApi from "./features/book/api";

const api = new Elysia({ prefix: "/api" })
  .use(bookApi)
;

export default api;