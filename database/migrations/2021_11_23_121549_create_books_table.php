<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('publication_year');
            $table->string('author');
            $table->string('code')->unique();
            $table->string('genre');
            /**
             * id type of laravel is unsignedBigInteger, if the foreign key that will be used has different type
             * the migration will fail because type mismatch.
             */
            $table->unsignedBigInteger('created_by');
            $table->timestamps();

            $table->foreign('created_by')->references('id')->on('users')->onDelete('no action');
        });

        Schema::create('book_amounts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('book_id')->unique();
            $table->unsignedBigInteger('amount');
            $table->unsignedBigInteger('available_amount');
            $table->timestamps();
            
            $table->foreign('book_id')->references('id')->on('books')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('books');
        Schema::dropIfExists('book_amounts');
    }
}
