import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

/**
 * Fetches rows from a Supabase table.
 * Optionally filters by the current user's ID using a specified field.
 * Designed to work with Supabase Row-Level Security (RLS).
 */
export const useTable = <T = any>(
  table: string,
  filterByUser: boolean = false,
  userField: string = "owner_id"
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let query = supabase.from(table).select("*");

        if (filterByUser) {
          const { data: userData, error: userError } = await supabase.auth.getUser();
          if (userError || !userData?.user?.id) {
            throw new Error("Unable to fetch authenticated user.");
          }

          // Apply client-side filter (optional if RLS is enforced)
          query = query.eq(userField, userData.user.id);
        }

        const { data: rows, error: queryError } = await query;

        if (queryError) {
          throw new Error(queryError.message);
        }

        setData(rows as T[]);
      } catch (err: any) {
        setError(err.message);
      }

      setLoading(false);
    };

    fetchData();
  }, [table, filterByUser, userField]);

  return { data, loading, error };
};
