"use client";

import { useAuthStore } from '@/lib/store/auth-store';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
    const { user, isAuthenticated, logout } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated) {
            redirect('/');
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-800 text-white p-6">
                    <h1 className="text-2xl font-bold">Profile</h1>
                </div>
                <div className="p-6">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Account Information</h2>
                        <div className="space-y-2">
                            <p><span className="font-medium">Name:</span> {user?.name}</p>
                            <p><span className="font-medium">Email:</span> {user?.email}</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={logout}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}