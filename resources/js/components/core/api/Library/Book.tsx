import { ApiResponse } from "../../interfaces/ApiResponse";
import { Book } from "../../interfaces/Library";
import { getWithToken } from "../request";

export async function getBooks(): Promise<ApiResponse<Book[]>> {
    const book = await getWithToken<Book[]>("/api/book/books-created-by");
    return book;
}

export async function getAllBooks(): Promise<ApiResponse<Book[]>> {
    const books = await getWithToken<Book[]>("/api/book");
    return books;
}
