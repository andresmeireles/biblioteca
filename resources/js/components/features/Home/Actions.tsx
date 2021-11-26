import { getBooks } from "../../core/api/Library/Book";

export async function bookAmount(): Promise<number> {
    const books = await getBooks();
    if (!books.success) {
        return 0;
    }
    return books.message.length;
}
