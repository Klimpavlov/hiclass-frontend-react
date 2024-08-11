import { NextResponse } from 'next/server';

export async function POST(request) {
    const { refreshToken } = await request.json();

    const response = NextResponse.json({ message: 'Success' });

    // Установка рефреш-токена в HttpOnly куки
    response.cookies.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/',
    });

    return response;
}
