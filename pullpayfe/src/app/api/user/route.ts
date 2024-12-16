// app/api/user/route.ts

import { NextResponse } from 'next/server';

// GET request: Fetch the current profile data
export async function GET() {
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
    };
    return NextResponse.json(user); // Return the user data as JSON
}

// PUT request: Update the profile with new data
export async function PUT(request: Request) {
    try {
        const data = await request.json(); // Get the updated profile data
        console.log('Received data to update:', data); // Log the data for debugging

        // Here, you should update the profile in the database
        // For now, we simulate it by returning the updated data directly
        const updatedUser = {
            name: data.name || 'John Doe',
            email: data.email || 'john.doe@example.com',
        };

        console.log('Updated profile:', updatedUser); // Log the updated profile for debugging

        return NextResponse.json(updatedUser); // Return the updated user as JSON
    } catch (error) {
        console.error('Error updating profile:', error); // Log any error
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}