import { error } from "elysia";
import Book from "./model";
import { BookType } from "./schema";

abstract class BookService {
  static async add(data: BookType) {
    await Book.create(data);
  }

  static async view(bookId: string) {
    const book = await Book.findOne({ bookId }).lean().exec();
    if(!book)
      throw error(404);
    return book;
  }

  static async viewList() {
    const books = await Book.find().lean().exec();
    return books;
  }

  static async edit(bookId: string, data: Partial<BookType>) {
    const book = await Book.findOneAndUpdate({ bookId }, data, { new: true }).lean().exec();
    if(!book)
      throw error(404);
    return book;
  }

  static async delete(bookId: string) {
    const book = await Book.findOneAndDelete({ bookId }).lean().exec();
    if(!book)
      throw error(404);
    return "book is deleted successfully.";
  }

  static async read(bookId: string){
    const book = await Book.findOneAndUpdate({ bookId }, { readed: true }, { new: true }).lean().exec();
    if(!book)
      throw error(404);
    return book;
  }
}

export default BookService;