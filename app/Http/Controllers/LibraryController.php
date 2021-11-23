<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LibraryController extends Controller
{
    public function addBook(Request $request): JsonResponse
    {
        $bookData = $request->request->all();
    }
}
