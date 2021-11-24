<?php

declare(strict_types=1);

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Hash;

class ConfirmationEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(
        private User $user
    ) {
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $appUrl = env('APP_URL');
        $userHash = Hash::make($this->user->username);

        $confirmationEmail = sprintf('%s/confirmation?u=%s&h=%s', $appUrl, $this->user->id, $userHash);

        return $this->view('email.auth.confirmation', ['confirmationLink' => $confirmationEmail]);
    }
}
