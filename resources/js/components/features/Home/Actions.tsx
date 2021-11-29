import { getUserBooks } from "../../core/api/Library/Book";
import { getMyBorrowedBooks } from "../Borrow/Action";

export async function bookAmount(): Promise<number> {
    const books = await getUserBooks();
    if (!books.success) {
        return 0;
    }
    return books.message.length;
}

export async function borrowAmount(): Promise<number> {
    const borrows = await getMyBorrowedBooks();
    if (!borrows.success) {
        return 0;
    }

    return borrows.message.length;
}
