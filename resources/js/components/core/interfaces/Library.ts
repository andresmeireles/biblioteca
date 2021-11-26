export interface Book {
    id: number;
    name: string;
    author: string;
    publication_year: number;
    code: string;
    genre: string;
    created_by: number;
}

export interface BookWithAmount {
    book: Book;
    amount: number;
    available_amount: number;
}
