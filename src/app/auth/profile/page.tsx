"use client";

import { useEffect } from "react";
import { createProfile } from "../../../../lib/createProfile";
import { getProfile } from "../../../../constants/general";
import { supabase } from "../../../../lib/supabaseClient";

export default async function Profile() {
    useEffect(() => {
        createProfile();
    }, []);
    const {
        data: { session },
    } = await supabase.auth.getSession();

    const accessToken = session?.access_token;
    return (
        <div>
            <p>{accessToken || 0}</p>
            <p>{getProfile?.id}</p>
            <img src={getProfile?.avatar_url} alt="" />
        </div>
    );
}