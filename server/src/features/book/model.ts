import { model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const Book = model("book", new Schema({
  bookId: {
    type: String,
    default: uuidv4
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  readed: {
    type: Boolean,
    default: false
  }
}));

export default Book;