import { supabase } from "../lib/supabaseClient";

export const useTableMutations = (table: string) => {
    const insert = async (values: Record<string, any>) => {
        const { data, error } = await supabase.from(table).insert(values).select();
        if (error) throw new Error(error.message);
        return data;
    };

    const update = async (id: string | number, values: Record<string, any>) => {
        const { data, error } = await supabase.from(table).update(values).eq("id", id).select();
        if (error) throw new Error(error.message);
        return data;
    };

    const remove = async (id: string | number) => {
        const { error } = await supabase.from(table).delete().eq("id", id);
        if (error) throw new Error(error.message);
    };

    return { insert, update, remove };
};