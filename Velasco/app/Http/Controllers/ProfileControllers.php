<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;

class ProfileController extends Controller
{
    // GET: fetch all profiles
    public function index()
    {
        return response()->json(Profile::all());
    }

    // POST: store a new profile
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:profiles,email',
            'bio'   => 'nullable|string',
        ]);

        $profile = Profile::create($validated);

        return response()->json($profile, 201);
    }
}
