import { postWithToken } from "../../../core/api/request";
import { ApiResponse } from "../../../core/interfaces/ApiResponse";
import {
    BookFormInterface,
    BookWithAmount,
} from "../../../core/interfaces/Library";

async function AddBook(
    form: BookFormInterface
): Promise<ApiResponse<BookWithAmount | string>> {
    const { name, author, publicationYear, code, genre, amount } = form;
    const payload = {
        name,
        author,
        publication_year: publicationYear,
        code,
        genre,
        amount,
    };
    const response = await postWithToken<BookWithAmount>(
        "/api/book/add",
        payload
    );
    return response;
}

export default AddBook;
