import { supabase } from "../lib/supabaseClient";

export async function checkSupabaseConnection(): Promise<void> {
    const { error } = await supabase.auth.getSession();
    if (error) {
        console.error("❌ Supabase connection failed:", error.message);
        throw new Error("Supabase connection failed.");
    }

    console.log("✅ Supabase connection successful.");
}