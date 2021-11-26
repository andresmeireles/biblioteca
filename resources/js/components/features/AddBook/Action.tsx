import React, { FormEvent } from "react";
import { postWithToken } from "../../core/api/request";
import {
    ApiResponse,
    FailApiResponse,
} from "../../core/interfaces/ApiResponse";
import { BookWithAmount } from "../../core/interfaces/Library";

export default async function addBook(
    form: FormData
): Promise<ApiResponse<BookWithAmount | string>> {
    const name = form.get("name");
    const author = form.get("author");
    const publicationYear = form.get("publicationYear");
    const code = form.get("code");
    const genre = form.get("genre");
    const amount = form.get("amount");
    if (
        name === null ||
        author === null ||
        publicationYear === null ||
        code === null ||
        genre === null ||
        amount === null
    ) {
        return FailApiResponse("campos não preenchidos");
    }
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
