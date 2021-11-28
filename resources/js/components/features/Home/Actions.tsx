import { getUserBooks } from "../../core/api/Library/Book";

export async function bookAmount(): Promise<number> {
    const books = await getUserBooks();
    if (!books.success) {
        return 0;
    }
    return books.message.length;
}
