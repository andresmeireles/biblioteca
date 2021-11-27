<?php

declare(strict_types=1);

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendForgotPasswordEmail extends Mailable
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
        $forgotHash = password_hash($this->user->username, PASSWORD_DEFAULT);
        $forgotPasswordLink = sprintf(
            '%s/change-forgot-password?u=%s&f=%s',
            env('APP_URL'),
            $this->user->id,
            $forgotHash
        );

        return $this->view('email.auth.forgotEmail', [
            'forgotPasswordLink' => $forgotPasswordLink
        ]);
    }
}
