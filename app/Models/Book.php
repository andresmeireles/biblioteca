<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\Book
 *
 * @property int $id
 * @property string $name
 * @property string $publication_year
 * @property string $author
 * @property string $code
 * @property string $genre
 * @property int $created_by
 * @property BookAmount $bookAmount
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Book newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Book newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Book query()
 * @method static \Illuminate\Database\Eloquent\Builder|Book whereAuthor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book whereGenre($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book wherePublicationYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Book whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'publication_year',
        'author',
        'code',
        'genre',
        'created_by'
    ];

    public function bookAmount(): HasOne
    {
        return $this->hasOne(BookAmount::class, 'book_id', 'id');
    }

    public function getCreatedByAttribute(string $value): User
    {
        $user = User::where('id', (int) $value)->first();
        return $user;
    }
}
