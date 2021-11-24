<?php

declare(strict_types=1);

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

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
        $userHash = password_hash($this->user->username, PASSWORD_DEFAULT);

        $confirmationEmail = sprintf('%s/confirmation?u=%s&h=%s', $appUrl, $this->user->id, $userHash);

        return $this->view('email.auth.confirmation', ['confirmationLink' => $confirmationEmail]);
    }
}
