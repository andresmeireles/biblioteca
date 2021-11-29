import {
    getWithToken,
    postWithToken,
    putWithToken,
} from "../../core/api/request";
import { ApiResponse } from "../../core/interfaces/ApiResponse";
import { HasPermission } from "../../core/interfaces/AuthInterface";
import { BorrowedBook } from "../../core/interfaces/Library";

export async function executeBorrow(
    bookId: number,
    expectedReturnDate: Date
): Promise<ApiResponse<string>> {
    return postWithToken<string>("/api/book/borrow", {
        bookId,
        expectedReturnDate,
    });
}

export async function getMyBorrowedBooks(): Promise<
    ApiResponse<BorrowedBook[] | string>
> {
    return getWithToken("/api/book/borrow/user");
}

export async function getNonFinishedBorrows(): Promise<
    ApiResponse<HasPermission | BorrowedBook[] | string>
> {
    return getWithToken<HasPermission | BorrowedBook[] | string>(
        "/api/book/borrow/non-finished"
    );
}

export async function setBorrowPermission(
    borrowId: number,
    status: boolean
): Promise<ApiResponse<string | BorrowedBook>> {
    return putWithToken("/api/book/borrow/approve", { borrowId, status });
}

export async function returnBorrowBook(props: {
    returnDate: Date;
    isLost: boolean;
    borrowId: number;
}): Promise<ApiResponse<string>> {
    return postWithToken<string>("/api/book/borrow/return", props);
}
