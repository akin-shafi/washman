// pages/api/auth/logout.js
import { getSession } from "next-auth/react";
import { destroyCookie } from 'nookies';

export default async function handler(req, res) {
    const session = await getSession({ req });

    if (session) {
        // Destroy the session here by clearing cookies or using your session management strategy
        destroyCookie({ res }, 'next-auth.session-token', { path: '/' });
        destroyCookie({ res }, 'next-auth.csrf-token', { path: '/' });

        res.status(200).json({ message: "Logged out successfully" });
    } else {
        res.status(401).json({ error: "Not authenticated" });
    }
}
