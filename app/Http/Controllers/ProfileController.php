<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;

class ProfileController extends Controller
{
    // Get all profiles
    public function index()
    {
        return Profile::orderBy('id', 'desc')->get();
    }

    // Save new profile
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
        ]);

        $profile = Profile::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
        ]);

        return response()->json($profile, 201);
    }
}
