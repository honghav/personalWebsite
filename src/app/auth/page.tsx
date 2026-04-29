"use client";

import { supabase } from "../../../lib/supabaseClient";


export default function LoginPage() {
    const signInWithGoogle = async () => {
        const google = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "http://localhost:3000/auth/callback",
            },
        });
        console.log("Google sign-in response:", google.data);
        return google;
    };

    const signInWithEmail = async () => {
        await supabase.auth.signInWithOtp({
            email: "test@example.com", // replace with input later
        });
    };

    return (
        <div className="flex flex-col gap-4 p-10">
            <button onClick={signInWithGoogle}>
                Sign in with Google
            </button>

            <button onClick={signInWithEmail}>
                Sign in with Email
            </button>
        </div>
    );
}