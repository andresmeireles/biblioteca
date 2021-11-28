import { ApiUser } from "./ApiUser";

export interface BookFormInterface {
    name: string;
    author: string;
    publicationYear: number;
    code: string;
    genre: string;
    amount: number;
}

export interface Book {
    id: number;
    name: string;
    author: string;
    publication_year: number;
    code: string;
    genre: string;
    created_by: number;
}

export function emptyBook() {
    return {
        id: 0,
        name: "",
        author: "",
        publication_year: 0,
        code: "",
        genre: "",
        created_by: 0,
    };
}

export interface BookWithAmount {
    book_id: Book;
    amount: number;
    available_amount: number;
}

export function emptyBookWithAmount() {
    return { book: emptyBook(), amount: 1, available_amount: 0 };
}

export interface BorrowedBook {
    id: number;
    user_id: ApiUser;
    book_id: Book;
    pick_up_date: string;
    expected_return_date: string;
    return_date: string | null;
    is_approve: boolean | null;
    finished: boolean;
}
