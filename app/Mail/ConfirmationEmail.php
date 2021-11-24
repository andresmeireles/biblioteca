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
        $userHash = str_rot13(sprintf('%s%s', $this->user->username, ($this->user->created_at ?? now())->getTimestamp()));

        $confirmationEmail = sprintf('%s/confirmation?u=%s&h=%s', $appUrl, $this->user->id, $userHash);

        return $this->view('email.auth.confirmation', ['confirmationLink' => $confirmationEmail]);
    }
}
