<?php

namespace App\Http\Controllers\Task;

use App\Events\TasksStatusEvent;
use App\Http\Controllers\Controller;
use App\Models\tasks;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia::render('Task/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
       $data = $request->validate([
            'title' => 'required|string|max:255',
            'contents' => 'required',
            'status' => 'required',
        ]);

        $data['user_id'] = Auth::id();

       tasks::create($data);

       return redirect(route('dashboard'));

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $data = tasks::find($id);

        return inertia::render('Task/show', [
            'task' => $data
        ]);

        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $data = tasks::find($id);

        return inertia::render('Task/Edit', [
            'task' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'contents' => 'required',
            'status' => 'required',
        ]);
        $task = tasks::find($id);


        $task->title = $data['title'];
        $task->contents = $data['contents'];
        $task->status = $data['status'];

        $task->save();



       return redirect(route('dashboard'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = tasks::find($id);

        $task->delete();

        return redirect(route('dashboard'));
    }

    public function pendingTask($id)
    {
        $task = tasks::find($id);

        if($task->status <= 49){

            $user = User::find(Auth::id());

             
            $task->status = 50;

            $task->save();

            // broadcast the event
            broadcast(new TasksStatusEvent($task, $user));
           
            
            //     return redirect()->back();

            // };
        
        // return redirect()->back();
        // dd($task->status);
        }
    }
}
