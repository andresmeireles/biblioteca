import { ApiResponse } from "../../interfaces/ApiResponse";
import {
    Book,
    BookFormInterface,
    BookWithAmount,
} from "../../interfaces/Library";
import { deleteWithToken, getWithToken, putWithToken } from "../request";

export async function getBooks(): Promise<ApiResponse<Book[] | string>> {
    const book = await getWithToken<Book[] | string>(
        "/api/book/books-created-by"
    );
    return book;
}

export async function getAllBooks(): Promise<ApiResponse<Book[] | string>> {
    const books = await getWithToken<Book[] | string>("/api/book");
    return books;
}

export async function getBookById(
    id: number
): Promise<ApiResponse<BookWithAmount | string>> {
    const book = await getWithToken<BookWithAmount | string>(`/api/book/${id}`);
    return book;
}

export async function editBook(
    id: number,
    bookData: BookFormInterface
): Promise<ApiResponse<Book | string>> {
    return putWithToken(`/api/book/${id}`, bookData);
}

export async function removeBook(id: number): Promise<ApiResponse<string>> {
    const remove = await deleteWithToken<string>(`/api/book/${id}`);
    return remove;
}
