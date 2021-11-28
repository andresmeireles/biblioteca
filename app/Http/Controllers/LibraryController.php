<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Responses\ApiResponse;
use App\Responses\ConsultResponse;
use App\Services\Library\AddBook;
use App\Services\Library\Borrow\BorrowBook;
use App\Services\Library\Borrow\ViewBorrow;
use App\Services\Library\DeleteBook;
use App\Services\Library\EditBook;
use App\Services\Library\ViewBook;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LibraryController extends Controller
{
    public function addBook(Request $request, AddBook $addBook): JsonResponse
    {
        try {
            $bookData = $request->request->all();
            $book = $addBook->add($bookData, (int) $bookData['amount'], $request->user());
            $responseBody = [
                'book' => $book,
                'amount' => $book->bookAmount
            ];
            $response = new ConsultResponse($responseBody, true);
            return response()->json($response->response());
        } catch (\Exception $err) {
            return response()->json((new ApiResponse($err->getMessage(), false))->response());
        }
    }

    public function editBookById(int $bookId, Request $request, EditBook $edit): JsonResponse
    {
        try {
            $user = $request->user();
            $infoEdit = $request->request->all();
            $edit = $edit->editById($bookId, $infoEdit, $user);
            $response = new ConsultResponse($edit, true);
            return response()->json($response->response());
        } catch (\Exception $err) {
            return response()->json(ConsultResponse::fail($err->getMessage())->response());
        }
    }

    public function bookById(int $bookId, ViewBook $view): JsonResponse
    {
        try {
            $book = $view->bookWithAmountById($bookId);
            $response = new ConsultResponse($book, true);

            return response()->json($response->response());
        } catch (\Exception $err) {
            return response()->json(ConsultResponse::fail($err->getMessage())->response());
        }
    }

    public function booksCreatedBy(Request $request, ViewBook $viewBook): JsonResponse
    {
        try {
            $user = $request->user();
            $books = $viewBook->booksCreatedBy($user->id);
            $result = new ConsultResponse($books, true);

            return response()->json($result->response());
        } catch (\Exception $err) {
            return response()->json((new ApiResponse($err->getMessage(), false))->response());
        }
    }

    public function books(ViewBook $book): JsonResponse
    {
        $response = new ConsultResponse($book->all(), true);

        return response()->json($response->response());
    }

    public function booksWithAmount(ViewBook $book): JsonResponse
    {
        try {
            $books = $book->bookWithAmount();
            $result = new ConsultResponse($books, true);

            return response()->json($result->response());
        } catch (\Exception $err) {
            return response()->json((new ApiResponse($err->getMessage(), false))->response());
        }
    }

    public function removeBook(int $bookId, Request $request, DeleteBook $delete): JsonResponse
    {
        try {
            $user = $request->user();
            $response = $delete->deleteById($bookId, $user);
            $response = new ConsultResponse('livro removido com sucesso', true);
            return response()->json($response->response());
        } catch (\Exception $err) {
            $response = ConsultResponse::fail($err->getMessage());

            return response()->json($response->response());
        }
    }

    public function borrow(Request $request, BorrowBook $borrow): JsonResponse
    {
        try {
            $bookId = $request->request->getInt('bookId');
            $user = $request->user();
            $expectReturnDate = (string) $request->request->get('expectedReturnDate');
            $result = $borrow->borrow($bookId, $user, new \DateTime(), new \DateTime($expectReturnDate));
            $response = new ConsultResponse($result);

            return response()->json($response->response());
        } catch (\Exception $err) {
            return response()->json(ConsultResponse::fail($err->getMessage())->response());
        }
    }

    public function toApproveBorrows(ViewBorrow $view): JsonResponse
    {
        try {
            $borrows = $view->toApprove();
            return response()->json((new ConsultResponse($borrows))->response());
        } catch (\Exception $err) {
            return response()->json(ConsultResponse::fail($err->getMessage())->response());
        }
    }

    public function setApprove(Request $request, BorrowBook $borrow): JsonResponse
    {
        try {
            $user = $request->user();
            $borrowId = $request->request->getInt('borrowId');
            $status = $request->request->getBoolean('status');
            $borrowBook = $borrow->changeApproveStatus($user, $borrowId, $status);
            $response = new ConsultResponse($borrowBook);

            return response()->json($response->response());
        } catch (\Exception $err) {
            return response()->json(ConsultResponse::fail($err->getMessage())->response());
        }
    }

    public function borrowBookByUser(Request $request, ViewBorrow $viewBorrow): JsonResponse
    {
        try {
            $user = $request->user();
            $borrowedBooks = $viewBorrow->byUser($user->id);

            return response()->json((new ConsultResponse($borrowedBooks))->response());
        } catch (\Exception $err) {
            return response()->json(ConsultResponse::fail($err->getMessage())->response());
        }
    }
}
