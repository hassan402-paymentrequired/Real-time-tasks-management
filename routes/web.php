<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Task\TaskController;
use App\Models\tasks;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', ['tasks' => User::with('tasks')->latest()->find(Auth::id())]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function (){
    Route::get('/tasks/create',[TaskController::class, 'create']);
    Route::post('/tasks/create',[TaskController::class, 'store']);
    Route::get('/task/edit/{id}',[TaskController::class, 'edit']);
    Route::patch('/tasks/edit/{id}',[TaskController::class, 'update']);
    Route::delete('/task/delete/{id}',[TaskController::class, 'destroy']);
    Route::get('/task/{Id}',[TaskController::class, 'show']);
    Route::patch("/task/status/{id}", [TaskController::class, 'pendingTask']);
});


require __DIR__.'/auth.php';
