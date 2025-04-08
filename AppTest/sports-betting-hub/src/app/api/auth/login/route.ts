import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // Find user by email
        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 400 }
            );
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 400 }
            );
        }

        // In a real app, you would generate a proper JWT token
        const token = 'generated-jwt-token';

        return NextResponse.json(
            { user: { id: user.id, name: user.name, email: user.email }, token },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
}