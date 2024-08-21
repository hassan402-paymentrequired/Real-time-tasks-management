<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('Task.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
